const {createTransport} = require('nodemailer');

const TEST_MAIL = 'chad.reynolds79@ethereal.email'

const transporter =createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_TEST_MAIL,
        pass: process.env.NODEMAILE_PASS
    }
})

module.exports=transporter;