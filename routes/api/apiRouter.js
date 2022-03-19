import { Router } from 'express';
import expressJwt from 'express-jwt';
import { query } from '../../connection.js';
import isRevokedCallback from './isRevokedCallback.js';
import errorHandler from './errorHandler.js';
const router = Router();

router.get(
	'/checkAdmin',
	expressJwt({
		secret: 'thisisasecret',
		algorithms: ['HS256'],
		isRevoked: isRevokedCallback,
	}),
	errorHandler,
	async (req, res) => {
		try {
			const { user } = req;
			if (!user) {
				return res.json({
					success: false,
					message: 'Invalid token',
				});
			}
			if (user.role !== 'admin') {
				return res.json({
					success: true,
					message: 'User is not an admin',
					isAdmin: false,
				});
			}
			return res.json({
				success: true,
				isAdmin: true,
				message: 'Hey Admin!❤️',
			});
		} catch (err) {
			console.log(err);
		}
	}
);
router.get(
	'/userInfo',
	expressJwt({
		secret: 'thisisasecret',
		algorithms: ['HS256'],
		isRevoked: isRevokedCallback,
	}),
	errorHandler,
	async (req, res) => {
		try {
			const { user } = req;
			if (!user) {
				return res.json({
					success: false,
					message: 'Invalid token',
				});
			}
			const queryResults = await query(
				`SELECT id, firstname, lastname, email, username FROM ieeeusers WHERE id = '${user.id}'`
			);
			const userInfo = queryResults[0];
			if (!userInfo) {
				return res.json({
					success: false,
					message: 'User not found',
				});
			}
			return res.json({
				success: true,
				userInfo: { ...userInfo },
			});
		} catch (err) {
			console.log(err);
		}
	}
);

export default router;
