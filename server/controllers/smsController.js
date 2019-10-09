const {TWILIO_ACCOUNT_SECRET_ID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER, TWILIO_TEST_TOKEN, TWILIO_TEST_ID, TWILIO_FLOW} = process.env

module.exports = {
    sendSMS: (req, res) => {
        const {name, message} = req.body
        const accountSid = TWILIO_ACCOUNT_SECRET_ID;
        const authToken = TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                body: name + ' is interested in ' + message,
                from: TWILIO_PHONE_NUMBER,
                to: 17035894200
            })
            .then(message => {
                console.log(message)
                res.send(message)
            }).catch(err=>{
                console.log(err)
                res.sendStatus(500)
            })
    },
    recieveSMS: (req, res) => {
        const MessageResponse = require('twilio').twiml.MessageResponse;
        const twiml = new MessageResponse();

        twiml.message('The Robots are coming! Head for the hills!');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString())
    },
    initiateCall: (req, res) => {
        // const accountSid = TWILIO_TEST_ID;
        // const authToken = TWILIO_TEST_TOKEN;
        const accountSid = TWILIO_ACCOUNT_SECRET_ID;
        const authToken = TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        const { title, price, name, number} = req.body

        client.studio.flows(TWILIO_FLOW)
        .executions
        .create({to: number,
         from: TWILIO_PHONE_NUMBER,
         // Pass in the personalized data to Blacksmith Bot, so it can interact with the user
         // over the phone.
        parameters: JSON.stringify({"title":title, "price":price, "name":name})})
        .then(execution => console.log(execution, execution.sid))
    },
    verifyNumber: (req, res) => {
        const accountSid = TWILIO_ACCOUNT_SECRET_ID;
        const authToken = TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        // Call the Verify service I already setup on Twilio Console
        client.verify.services('VA5487c93b0134308b6d5e45ef54b621ca')
        .verificationChecks
        .create({to: '+phoneNumber', code: 'userProvidedCode'})
        .then(verification_check => console.log(verification_check.status));

        // TOKEN -> Response
        // If user's response was CORRECT, status will show as APPROVED
        // If INCORRECT, status will show as PENDING
    }
}