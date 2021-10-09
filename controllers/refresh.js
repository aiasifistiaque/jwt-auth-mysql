import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { generateAuthToken } from './login.js';
import { connection } from '../server.js';

const refresh = asyncHandler(async (req, res) => {
	try {
		const token = req.body.token;
		const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

		var query = connection.query(
			`SELECT * FROM users WHERE email = '${decoded.email}'`,
			async function (error, results, fields) {
				if (error || results.length < 1) {
					console.log(error);
					return res.status(500).send('Error: There was an error');
				} else {
					const user = results[0];
					if (user.refreshtoken != token) {
						return res.status(401).send('invalid refresh token');
					} else {
						const { access_token } = generateAuthToken(user);
						res.status(200).send(access_token);
					}
				}
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(500).send(error);
	}
});

export default refresh;
