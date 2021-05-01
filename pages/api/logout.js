import cookie from 'cookie';
import { API_URL } from '../../config/index';

export default async (req, resp) => {
	if (req.method === 'POST') {
		//destroy cookie when usr logs out
		resp.setHeader(
			'Set-Cookie',
			cookie.serialize('token', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: new Date(0),
				sameSite: 'strict',
				path: '/',
			})
		);

		resp.status(200).json({ message: 'User Logged out successfully' });
	} else {
		resp.setHeader('Allow', ['POST']);
		resp.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
