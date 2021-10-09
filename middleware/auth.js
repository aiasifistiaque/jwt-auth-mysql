import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export function authfunction(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) return res.status(401).send('Access denied. No token present');

	try {
		const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).send('Invalid token.');
	}
}

export const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
			req.user = decoded;
			//req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.error(error);
			res.status(401).send('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401).send('Access denied. No token present');
	}
});

export const admin = (req, res, next) => {
	if (req.user && req.user.role === 'admin') {
		next();
	} else {
		res.status(401).json({ msg: 'not authorized' });
	}
};
