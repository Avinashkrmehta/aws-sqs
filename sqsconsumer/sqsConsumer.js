import 'dotenv/config'
import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';


const app = Consumer.create({
  queueUrl: process.env.SQS_URL,
  batchSize: 10,
  waitTimeSeconds: 10,
  handleMessage: async (message) => {
      const recievedData = message //JSON.parse(message.Messages[0].Body);
      console.log('Data received', message);
  },
  sqs: new SQSClient({
    region: process.env.SQS_REGION,
    credentials: {
      accessKeyId: process.env.SQS_ACCESSKEY,
      secretAccessKey: process.env.SQS_SECRETKEY,
      sessionToken: process.env.SQS_SESSION_TOKEN
    }
  })
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.on('timeout_error', (err) => {
  console.error(err.message);
});

app.start();