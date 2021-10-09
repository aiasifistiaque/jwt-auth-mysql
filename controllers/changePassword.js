import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { connection } from '../server.js';

const changePassword = asyncHandler(async (req, res) => {
	try {
		console.log(req.body);
		var query = connection.query(
			`SELECT * FROM users WHERE email = '${req.user.email}'`,
			async function (error, results, fields) {
				if (error || results.length < 1) {
					console.log(error);
					return res.status(500).send('There was an error');
				} else {
					const foundUser = results[0];
					const validPassword = await bcrypt.compare(
						req.body.oldpassword,
						foundUser.password
					);
					if (!validPassword) return res.status(400).send('Incorrect Password');

					const salt = await bcrypt.genSalt(10);
					const newpass = await bcrypt.hash(req.body.password, salt);

					if (newpass) {
						connection.query(
							`UPDATE users SET ? WHERE email = '${req.user.email}'`,
							{
								password: newpass,
								resetcode: '',
							},
							async function (error, results, fields) {
								if (error) return res.status(500).json('Error, try again');
								else {
									return res.status(200).json({
										status: 'success',
										msg: 'Password has been changed successfully',
									});
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

export default changePassword;
