import { query } from '../../connection.js';

export default async (req, res) => {
	try {
		if (!req.headers.authorization.split(' ')[1]) {
			return res.json({
				success: false,
				message: 'Invalid token',
			});
		}
		const sql = `INSERT INTO expiredtokens (token) VALUES ('${
			req.headers.authorization.split(' ')[1]
		}')`;
		await query(sql);

		return res.json({
			success: true,
			message: 'User logged out successfully',
		});
	} catch (err) {
		console.log(err);
	}
};
