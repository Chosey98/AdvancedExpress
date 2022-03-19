import { Router } from 'express';

import expressJwt from 'express-jwt';
import signup from './signup.js';
import logout from './logout.js';
import login from './login.js';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);

router.post(
	'/logout',
	expressJwt({ secret: 'thisisasecret', algorithms: ['HS256'] }),
	logout
);
export default router;
