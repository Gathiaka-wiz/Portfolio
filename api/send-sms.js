const twilio = require('twilio');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const twilioNumber = process.env.TWILIO_NUMBER;
const destinationNumber = process.env.DESTINATION_NUMBER ; 

module.exports = async (req, res) => {
    if(req.method === 'POST'){ 
        const {Name,Email,Subject,message} = req.body;

        const messageBody = 
        `Name: ${Name}\n` +
        `Email: ${Email}\n` +
        `Subject: ${Subject}\n` +
        `Message: ${message}`;
    
        try{
            const message = await client.messages.create({
                body:messageBody,
                from:twilioNumber,
                to:destinationNumber
            });
            console.log('SMS sent with SID:',message.sid);
            res.status(200).json({success:true,message:'SMS sent successfully'});
        } catch(error){
            console.error('failed to send SMS',error);
            res.status(500).json({success:false,message:'Failed to send SMS'});
        }
    }else {
        res.status(405).json({message: 'Method not allowed'});
    }
};