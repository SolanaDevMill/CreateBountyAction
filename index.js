const { clusterApiUrl, Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const anchor = require('@project-serum/anchor');
// const NodeWallet = require('@project-serum/anchor/dist/cjs/nodewallet');

const core = require('@actions/core');
const github = require('@actions/github');
const { bs58 } = require("@project-serum/anchor/dist/cjs/utils/bytes");

(async () => {
    const pk = core.getInput('wallet-key');
    const payload = github.context.payload;
    const issueNumber = payload.issue?.number;
    const repoName = payload.repository?.name;
    const repoOwner = payload.repository?.owner.login;
    
    const regex = /DevMill Bounty: (\d+) SOL/;
    const bountyAmount = Number.parseInt(payload.issue?.body?.match(regex)[1]);
    
    const programId = "FAuRwCnsvpMHVBDcL47SGM5XSC7oY5u5u9VU3GDqWaZm";
    let connection = new Connection(clusterApiUrl("devnet"));
    const wallet = new anchor.Wallet(Keypair.fromSecretKey(bs58.decode(pk)));
    const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());

    const program = await anchor.Program.at(programId, provider);

    const [pda, _] = PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode(`bounty${issueNumber}${repoName}`)],
        program.programId
    );

    await program.methods
        .createBounty(
            issueNumber,
            repoName,
            repoOwner,
            new anchor.BN(bountyAmount * LAMPORTS_PER_SOL),
            Math.floor(Date.now() / 1000))
        .accounts({
            bounty: pda,
            poster: wallet.publicKey
        }).rpc()

    core.setOutput('bounty-address', pda.toString());
})();
