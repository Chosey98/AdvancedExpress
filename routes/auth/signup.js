import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { query } from '../../connection.js';
import createToken from './createToken.js';
export default async (req, res) => {
	try {
		const { username, password, email, firstname, lastname } = req.body;
		let sql = `SELECT * FROM ieeeusers WHERE username = '${username}' OR email = '${email}'`;
		const sqlQueryResults = await query(sql);
		if (sqlQueryResults.length > 0) {
			return res.json({
				success: false,
				message: 'Username or email already exists',
			});
		}
		const id = uuid();
		const encryptedPassword = bcrypt.hashSync(password, 10);
		sql = `INSERT INTO ieeeusers (id, username, password, email, firstname, lastname) VALUES ('${id}','${username}', '${encryptedPassword}', '${email}', '${firstname}', '${lastname}')`;
		await query(sql);
		return res.json({
			success: true,
			message: 'User created successfully',
			access_token: createToken({
				id: id,
				username: username,
				role: username == 'admin' ? 'admin' : 'user',
			}),
		});
	} catch (err) {
		console.log(err);
	}
};
