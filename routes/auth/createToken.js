import jwt from 'jsonwebtoken';
let secret = 'thisisasecret';

function createToken(data) {
	return jwt.sign({ ...data }, secret, { expiresIn: '24h' });
}

export default createToken;
