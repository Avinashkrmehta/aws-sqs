import 'dotenv/config'
import AWS from 'aws-sdk'

const dispatchMessage = async (message) => {

  const sqsRegion = process.env.SQS_REGION;
  const accessKeyId = process.env.SQS_ACCESSKEY;
  const secretAccessKey = process.env.SQS_SECRETKEY;
  const sessionToken = process.env.SQS_SESSION_TOKEN;
  const sqsUrl = process.env.SQS_URL;

  AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: sqsRegion,
      sessionToken: sessionToken

  });

  const sqs = new AWS.SQS();
  let params = {
    MessageBody: message,
    QueueUrl: sqsUrl,
    DelaySeconds: 0 
  };

  // Callback Style
  sqs.sendMessage(params, function(err, data) {
    console.log('---params---',params)
    if (err){
      console.log(err, err.stack);
    }
    else{
      console.log('---data---',data);
    }
  });
}


let sns_visitor_log = {
  action_type: 'insert',
  report_type: 'visitor_log',
  from_kiosk: true,
}


dispatchMessage(JSON.stringify(sns_visitor_log))

