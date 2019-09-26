
const sgMail= require('@sendgrid/mail')
const SENDGRID_API_KEY = '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'

sgMail.setApiKey(SENDGRID_API_KEY)

const sendWelcomeEmail = (email, subject, text) => {
    sgMail.send({
        to: email,
        from: 'kasule08joseph@gmail.com',
        subject: subject,
        text: text
    })
}

export default sendWelcomeEmail