import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from 'dotenv';
dotenv.config();

const PK = process.env.CHANNEL_PRIVATE_KEY
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
const receiver = 'eip155:5:0xFd6C2fE69bE13d8bE379CCB6c9306e74193EC1A9'
const channel = 'eip155:5:0x98821462cB7Aa6fca72c6590D04bEA098c4483D0'
const myNotificationTitle = '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
const myNotificationBody = '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'

const sendNotification = async () => {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3,
            identityType: 2,
            notification: {
                title: myNotificationTitle,
                body: myNotificationBody
            },
            payload: {
                title: myNotificationTitle,
                body: myNotificationBody,
                cta: 'https://youtube.com',
                img: ''
            },
            recipients: receiver,
            channel: channel, // your channel address
            env: ENV.STAGING
        });

    } catch (err) {
        console.error('Error: ', err);
    }
}

sendNotification();