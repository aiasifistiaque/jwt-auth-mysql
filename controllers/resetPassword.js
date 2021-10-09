import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { connection } from '../server.js';

const resetPassword = asyncHandler(async (req, res) => {
	try {
		console.log(req.body);
		var query = connection.query(
			`SELECT * FROM users WHERE email = '${req.body.email}'`,
			async function (error, results, fields) {
				if (error || results.length < 1) {
					console.log(error);
					return res.status(500).send('Error: This Email is not registered');
				} else {
					const foundUser = results[0];
					if (foundUser.resetcode != req.body.otp) {
						return res.status(400).send('Invalid OTP, try again');
					}

					const salt = await bcrypt.genSalt(10);
					const newpass = await bcrypt.hash(req.body.password, salt);

					if (newpass) {
						connection.query(
							`UPDATE users SET ? WHERE email = '${req.body.email}'`,
							{
								password: newpass,
								resetcode: '',
							},
							async function (error, results, fields) {
								if (error) return res.status(500).json('Error, try again');
								else {
									return res.status(200).json({ status: 'success' });
								}
							}
						);
					}
				}
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json('Error, try again');
	}
});

export default resetPassword;
