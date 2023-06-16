import 'dotenv/config'
import { Producer } from 'sqs-producer';
import { SQSClient } from '@aws-sdk/client-sqs';

// create simple producer
const producer = Producer.create({
  queueUrl: process.env.SQS_URL,
  sqs: new SQSClient({
    region: process.env.SQS_REGION,
    credentials: {
      accessKeyId: process.env.SQS_ACCESSKEY,
      secretAccessKey: process.env.SQS_SECRETKEY,
      sessionToken: process.env.SQS_SESSION_TOKEN
    }
  })
});




let sns_visitor_log = {
  from: generateString(10),
  action_type: generateString(10),
  report_type: generateString(10),
  from_kiosk: true,
  community_id: `60712${generateString(2)}`,
  device_id: generateString(15)
}


let final_message = {
  id: `d1b08700-4d39-5282-a927-da026e096d44`,
  body:JSON.stringify(sns_visitor_log) 
}

function generateString(length) {
    let result = ' ';
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}



// send messages to the queue
console.log('---final message---', final_message)
let result = await producer.send(final_message);
console.log('---result---',result);