const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'petprojectemailaddress@gmail.com',
        pass: 'ghwzgbrqzzsnuxxy'
    }
});

const sendMail = async (req, res) =>{
    const email = res.email;

    const mailOptions = {
        from: 'petprojectemailaddress@gmail.com',
        to: email,
        subject: 'Homework email',
        text: 'Seats are paid'
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        } else {
            console.log('Email sent: ' + info.response);
            return res.sendStatus(200);
        }
    });
}

module.exports = sendMail
