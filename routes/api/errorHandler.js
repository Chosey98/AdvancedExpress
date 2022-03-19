export default function expiredErrorHandler(err, req, res) {
	if (err.message === 'jwt expired') {
		return res.status(401).json({
			success: false,
			message: 'Invalid token',
		});
	} else {
		console.log(err);
		return res.json({
			success: false,
			message: err.message,
		});
	}
}
