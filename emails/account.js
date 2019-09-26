import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, subject, text) => {
    sgMail.send({
        to: email,
        from: process.env.EMAIL_FROM_,
        subject: subject,
        text: text
    })
}

export default sendWelcomeEmail