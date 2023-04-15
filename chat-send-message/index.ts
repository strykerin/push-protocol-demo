// initialize sdk
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import * as dotenv from 'dotenv';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;
const env = ENV.STAGING
const provider = ethers.getDefaultProvider(5);
const Pkey = `0x${walletPrivateKey}`;
const signer = new ethers.Wallet(Pkey, provider);


// Push Chat - PushAPI.chat.send
// // Will send a message to the user or chat request in case user hasn't approved them
async function PushAPI_chat_send() {
  // Fetch user
  const user = await PushAPI.user.get({
    account: `eip155:${signer.address}`,
    env
  })

  // Decrypt PGP Key
  const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  })

  // Actual api
  const response = await PushAPI.chat.send({
    messageContent: "Ohayou",
    messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF"
    receiverAddress: 'eip155:0xFd6C2fE69bE13d8bE379CCB6c9306e74193EC1A9',
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: env as ENV,
  })
  console.log('Message sent')
}

PushAPI_chat_send()