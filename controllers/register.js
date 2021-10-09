import bcrypt from 'bcrypt';
import _ from 'lodash';
import { connection } from '../server.js';
import Joi from 'joi';

const register = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	let user;

	user = _.pick(req.body, ['email', 'phone', 'NRC', 'password']);
	user.role = req.body.role || 'user';
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	var query = connection.query(
		'INSERT INTO users SET ?',
		user,
		function (error, results, fields) {
			if (error) {
				return res.status(500).send(error.sqlMessage);
			} else {
				console.log(results, fields);
				res.status(200).send('user has been successfully registered');
			}
		}
	);
};

export function validate(user) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		phone: Joi.string().min(5).max(255).required(),
		password: Joi.string().min(5).max(255).required(),
		NRC: Joi.string().min(10).required(),
	});
	return schema.validate(user);
}

export default register;
