import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from 'dotenv';
dotenv.config();


const PK = process.env.CHANNEL_PRIVATE_KEY
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
const receiver = 'eip155:5:0x9dc230703b28b739c7Fcee6ff20F59fBD9F7CC65'
const channel = 'eip155:5:0x98821462cB7Aa6fca72c6590D04bEA098c4483D0'

const sendNotification = async () => {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3, // target
            identityType: 2, // direct payload
            notification: {
                title: `[SDK-TEST] notification TITLE:`,
                body: `[sdk-test] notification BODY`
            },
            payload: {
                title: `[sdk-test] payload title`,
                body: `sample msg body`,
                cta: '',
                img: ''
            },
            recipients: receiver,
            channel: channel, // your channel address
            env: 'staging'
        });

    } catch (err) {
        console.error('Error: ', err);
    }
}

sendNotification();