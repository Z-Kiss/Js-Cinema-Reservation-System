const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'petprojectemailaddress@gmail.com',
        pass: 'ghwzgbrqzzsnuxxy'
    }
});



const sendMail = async (req, res) =>{


    const mailOptions = {
        from: 'petprojectemailaddress@gmail.com',
        to: 'zotyaaa92@gmail.com',
        subject: 'Homework email',
        text: 'Seats are paid, and let me thank you for the opportunity'
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


