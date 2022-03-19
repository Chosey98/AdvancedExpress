import mysql from 'mysql';

const sqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ieeetest',
	database: 'ieee',
});

export function query(sql) {
	return new Promise((resolve, reject) => {
		sqlConnection.query(sql, (err, results) => {
			if (err) return reject(err);
			return resolve(results);
		});
	});
}
export default sqlConnection;
