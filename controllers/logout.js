import asyncHandler from 'express-async-handler';
import { connection } from '../server.js';

const logout = asyncHandler(async (req, res) => {
	try {
		const query = connection.query(
			`UPDATE users SET refreshtoken = '' WHERE email = '${req.user.email}'`,
			function (error, results, fields) {
				if (error) {
					return res.status(500).send('error logging out');
				} else {
					console.log(results, fields);
					res.status(200).send('logged out');
				}
			}
		);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
});

export default logout;
