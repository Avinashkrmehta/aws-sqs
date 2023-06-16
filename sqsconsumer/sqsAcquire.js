// require('dotenv').config();
// // import * as AWS from 'aws-sdk';
// const AWS = require('aws-sdk');


// const getMessage = async () => {
//   // getting aws credentails from environment variable
//   const sqsRegion = process.env.SQS_REGION;
//   const accessKeyId = process.env.SQS_ACCESSKEY;
//   const secretAccessKey = process.env.SQS_SECRETKEY;
//   const sessionToken = process.env.SQS_SESSION_TOKEN;
//   const sqsUrl = process.env.SQS_URL;

//   AWS.config.update({
//       accessKeyId: accessKeyId,
//       secretAccessKey: secretAccessKey,
//       region: sqsRegion,
//       sessionToken: sessionToken

//   });

//   const sqs = new AWS.SQS();

//   let params = {
//     QueueUrl: sqsUrl,
//     MaxNumberOfMessages: 1
//   };

//   // Callback Style
//   sqs.receiveMessage(params, function(err, data) {
//     if(err){
//       console.log(err, err.stack); // an error occurred
//     }
//     else{
//       console.log('---data---',data);           // successful response
//     }
//   });
//   // Async / Await Style
//   let result = await sqs.receiveMessage(params).promise();
//   console.log('---result---',result);
// }

// getMessage();


//*************************************OTHER LOGIC********************************************************

// require('dotenv').config();
// // Load the AWS SDK for Node.js
// const AWS = require('aws-sdk');


// const getMessage = async () => {

//   // Set the region
//     const sqsRegion = process.env.SQS_REGION;
//     const accessKeyId = process.env.SQS_ACCESSKEY;
//     const secretAccessKey = process.env.SQS_SECRETKEY;
//     const sessionToken = process.env.SQS_SESSION_TOKEN;
//     const sqsUrl = process.env.SQS_URL;

//     AWS.config.update({
//         accessKeyId: accessKeyId,
//         secretAccessKey: secretAccessKey,
//         region: sqsRegion,
//         sessionToken: sessionToken

//     });

//   // Create SQS service object
//   const sqs = new AWS.SQS();

//   // Setup the receiveMessage parameters
//   const params = {
//     QueueUrl: sqsUrl,
//     MaxNumberOfMessages: 1,
//     VisibilityTimeout: 0,
//     WaitTimeSeconds: 0
//   };

//   sqs.receiveMessage(params, (err, data) => {
//     if (err) {
//       console.log(err, err.stack);
//     }else {
//       console.log('------data--------',data)
//       if (!data.Messages) { 
//         console.log('Nothing to process'); 
//         return;
//       }
//       const recievedData = JSON.parse(data.Messages[0].Body);
//       console.log('Data received', recievedData);

//       // recievedData is now an object that contains order_id and date properties
//       // Lookup order data from data storage
//       // Execute billing for order
//       // Update data storage
      


//       // Now we must delete the message so we don't handle it again
//       const deleteParams = {
//         QueueUrl: sqsUrl,
//         ReceiptHandle: data.Messages[0].ReceiptHandle
//       };


//       sqs.deleteMessage(deleteParams, (err, data) => {
//         if (err) {
//           console.log(err, err.stack);
//         } else {
//           console.log('Successfully deleted message from queue');
//         }
//       });
//     }
//   });
// }

// getMessage();

//*************************************OTHER LOGIC********************************************************
//
//
import 'dotenv/config'
import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';


const app = Consumer.create({
  queueUrl: process.env.SQS_URL,
  batchSize: 10,
  waitTimeSeconds: 10,
  handleMessage: async (message) => {
      // const recievedData = message //JSON.parse(message.Messages[0].Body);
         console.log('Data received', message);
          // await new Promise(resolve => setTimeout(resolve, 5000));
          // console.log("Waited 5s");
          if(message.MessageId == '083dfbeb-bbe4-4fa7-a3d5-cef42fc22f88' || message.MessageId == '0a3a2ee0-69c2-4bcc-9922-6bf31080918a'){
              throw `Exception Thrown for MessageId ${message.MessageId}` 
          }
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
  console.log('-----------error-------------------',err);
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.log('-----------processing_error-------------------',err);
  console.error(err.message);
});

app.on('timeout_error', (err) => {
  console.log('-----------timeout_error-------------------',err);
  console.error(err.message);
});

app.start();
