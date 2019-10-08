const {TWILIO_ACCOUNT_SECRET_ID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER, TWILIO_TEST_TOKEN, TWILIO_TEST_ID} = process.env

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

        client.studio.flows('FW7b33ff0af882383fd3f40701f0b1c038')
        .executions
        .create({to: number,
         from: TWILIO_PHONE_NUMBER,
        parameters: JSON.stringify({"title":title, "price":price, "name":name})})
        .then(execution => console.log(execution.sid))
    }
}