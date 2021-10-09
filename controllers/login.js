import bcrypt from 'bcrypt';
import Joi from 'joi';
import { connection } from '../server.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		var query = connection.query(
			`SELECT * FROM users WHERE email = '${req.body.email}'`,
			async function (error, results, fields) {
				if (error || results.length < 1) {
					console.log(error);
					return res.status(500).send('Invalid email or password');
				} else {
					const validPassword = await bcrypt.compare(
						req.body.password,
						results[0].password
					);
					if (!validPassword)
						return res.status(400).send('Invalid email or password');

					const token = await generateAuthToken(results[0]);
					connection.query(
						`UPDATE users SET refreshtoken = '${token.refresh_token}' WHERE email = '${req.body.email}'`
					);

					return res.status(200).json(token);
				}
			}
		);
	} catch {
		e => {
			console.log(e);
			return res.status(500).json(e.message);
		};
	}
};

function validate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

export const generateAuthToken = user => {
	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
			phone: user.phone,
			NRC: user.NRC,
			role: user.role,
		},
		process.env.JWT_PRIVATE_KEY,
		{ expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h' }
	);
	const refreshToken = jwt.sign(
		{
			id: user.id,
			email: user.email,
			phone: user.phone,
			NRC: user.NRC,
			role: user.role,
		},
		process.env.JWT_REFRESH_SECRET
	);
	return { access_token: `Bearer ${token}`, refresh_token: refreshToken };
};

export default login;
