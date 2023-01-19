// import * as anchor from "@project-serum/anchor";
// import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
// import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
// import { BN } from "bn.js";

const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
    const pk = core.getInput('wallet-key');

    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    const payload = github.context.payload;
    const issueNumber = payload.issue?.number;
    const repoName = payload.repository?.name;
    const repoOwner = payload.repository?.owner.login;
    
    const regex = /DevMill Bounty: (\d+) SOL/;
    const bountyAmount = Number.parseInt(payload.issue?.body?.match(regex)[1]);

    console.log(JSON.stringify({
        issueNumber: issueNumber,
        repoName: repoName,
        repoOwner: repoOwner,
        bountyAmount: bountyAmount,
        pk: pk
    }));

    // const programId = "FAuRwCnsvpMHVBDcL47SGM5XSC7oY5u5u9VU3GDqWaZm";
    // let connection = new Connection(clusterApiUrl("devnet"));
    // const wallet = new NodeWallet(Keypair.fromSecretKey(TexEncoder().encode(pk)));
    // const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());

    // const program = await new anchor.Program.at(programId, provider);
    // await program.methods
    //     .createBounty(
    //         issueNumber,
    //         repoName,
    //         repoOwner,
    //         new BN(bountyAmount),
    //         Math.floor(Date.now() / 1000))
    //     .accounts({
    //         bounty: PublicKey.findProgramAddressSync(
    //             [`bounty${issueNumber}${repoName}`]
    //         ),
    //         programId
    //     }).rpc()

    // console.log("yay");
})();
