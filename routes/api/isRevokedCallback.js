import { query } from '../../connection.js';
export default async function isRevokedCallback(req, payload, done) {
	const sql = `SELECT * FROM expiredtokens WHERE token = '${
		req.headers.authorization.split(' ')[1]
	}'`;
	const sqlQueryResults = await query(sql);
	const token = sqlQueryResults[0];
	if (token) {
		return done(null, true);
	}
	return done(null, false);
}
