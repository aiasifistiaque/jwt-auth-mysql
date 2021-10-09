import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import auth from './routes/auth.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import mysql from 'mysql';

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

export var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	timeout: 60000,
});

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);

	connection.query(
		'CREATE DATABASE [IF NOT EXISTS] mydb',
		function (err, result) {
			if (err) console.log('database already exists');
			else console.log('Database created');
		}
	);

	var sql =
		'CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, phone VARCHAR(255) NOT NULL UNIQUE, NRC VARCHAR(10) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, role VARCHAR(255), resetcode VARCHAR(255), refreshtoken VARCHAR(255))';
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log('Table created');
	});
});

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Library API',
			version: '1.0.0',
		},
	},
	apis: ['app.js', './doc/*.js'],
};

app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
