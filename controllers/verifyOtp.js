import asyncHandler from 'express-async-handler';
import { connection } from '../server.js';

const verifyOtp = asyncHandler(async (req, res) => {
	try {
		var query = connection.query(
			`SELECT * FROM users WHERE email = '${req.body.email}'`,
			async function (error, results, fields) {
				if (error || results.length < 1) {
					console.log(error);
					return res.status(500).send('Error');
				} else {
					const foundUser = results[0];
					if (foundUser.resetcode != req.body.otp) {
						return res.status(400).send('Wrong Otp, try again');
					}

					return res
						.status(200)
						.json({ status: 'success', email: foundUser.email });
				}
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json('Error, try again');
	}
});

export default verifyOtp;
