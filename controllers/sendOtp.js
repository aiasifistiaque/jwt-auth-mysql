import asyncHandler from 'express-async-handler';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import { connection } from '../server.js';

const sendOtp = asyncHandler(async (req, res) => {
	try {
		var query = connection.query(
			`SELECT * FROM users WHERE email = '${req.body.email}'`,
			async function (error, results, fields) {
				if (error || results.length < 1) {
					console.log(error);
					return res.status(500).send('Error: This Email is not registered');
				} else {
					const foundUser = results[0];
					const otp = otpGenerator.generate(6, {
						upperCase: false,
						specialChars: false,
						alphabets: false,
					});

					connection.query(
						`UPDATE users SET ? WHERE email = '${req.body.email}'`,
						{
							resetcode: otp,
						}
					);

					sendOtpToMail(foundUser, otp);

					return res
						.status(200)
						.json({ status: 'sent', email: foundUser.email, otp: otp });
				}
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: error.message });
	}
});

const sendOtpToMail = (user, otp) => {
	try {
		var transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false,
			auth: {
				user: process.env.MAIL_ADDRESS,
				pass: process.env.MAIL_PASSWORD,
			},
		});

		var mailOptions = {
			from: process.env.MAIL_ADDRESS,
			to: user.email,
			subject: `Password Reset Request Code ${otp}`,
			text: 'Order placed Successfully',
			html: `<div>
					<h4 style="margin:0px;font-weight:400;">Hi, ${user.email}</h4>
                    <h5 style="margin-bottom:1px">We received a request to reset your Vincent's Sphere account password.</h5>
                    <h5 style="margin-bottom:5px">Enter the following password reset code:</h5>
                    <h2>${otp}</h2>
                    <hr/>
                    <p>This message was sent to ${user.email} at your request.</p>
                    <p style="margin:0px;">If you did not request a password reset, let us know:</p>
                    <br/>
                    <p style="margin:0px;">Phone: 01312-795919</p>
                    <p style="margin:0px;">Email: support@vincentsphere.com</p>
                    </div>`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

export default sendOtp;
