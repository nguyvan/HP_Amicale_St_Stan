const sgMail = require('@sendgrid/mail')

require("dotenv").config()

exports.handler =  async (event, context, callback) => {

    const payload = JSON.parse(event.body)

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const body = Object.keys(payload).map((k) => {
        return `${k}: ${payload[k]}`
    }).join("<br><br>");

    const msg = {
        to: process.env.SENDGRID_TO_EMAIL,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Amicale St-Stan - Nouvelle annonce',
        html: body,
    };

    try{
        await sgMail.send(msg)
        
        return {
            statusCode: 200,
            body: "Message sent"
        }
    } catch(e){
        return {
            statusCode: e.code,
            body: e.message
        }
    }
};