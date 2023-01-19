// import * as anchor from "@project-serum/anchor";
// import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
// import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
// import { BN } from "bn.js";

const core = require('@actions/core');
const github = require('@actions/github');

async () => {
    // const [pk, issueNumber, repoName, repoOwner, bountyAmount] = process.argv[2];

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

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(payload);
}

