import { query } from '../../connection.js';
import bcrypt from 'bcrypt';
import createToken from './createToken.js';
export default async (req, res) => {
	try {
		const { username, password } = req.body;
		const sql = `SELECT * FROM ieeeusers WHERE username = '${username}'`;
		const sqlQueryResults = await query(sql);
		const user = sqlQueryResults[0];
		if (!user) {
			return res.json({
				success: false,
				message: 'User not found',
			});
		}
		if (!bcrypt.compareSync(password, user.password)) {
			return res.json({
				success: false,
				message: 'Wrong password',
			});
		}
		return res.json({
			success: true,
			message: 'User logged in successfully',
			access_token: createToken({
				id: user.id,
				username: username,
				role: username == 'admin' ? 'admin' : 'user',
			}),
		});
	} catch (err) {
		console.log(err);
	}
};
