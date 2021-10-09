import mysql from 'mysql';

const connectDB = mysql.createConnection({
	host: 'localhost',
	port: 8080,
	user: 'istiaque',
	password: 'root',
	database: 'auth',
});

connectDB.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);

		return;
	}

	console.log('connected as id ' + connectDB.threadId);
});

export default connectDB;
