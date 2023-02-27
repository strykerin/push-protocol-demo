import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from 'dotenv';
dotenv.config();


const PK = process.env.CHANNEL_PRIVATE_KEY
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
const receiver = 'eip155:5:0xA465B5596e59FA87aB806515EB14D7a74873BC33'
const channel = 'eip155:5:0x98821462cB7Aa6fca72c6590D04bEA098c4483D0'
const myNotificationTitle = 'You received a new notification :)'
const myNotificationBody = 'Hello world'

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
            env: 'staging'
        });

    } catch (err) {
        console.error('Error: ', err);
    }
}

sendNotification();