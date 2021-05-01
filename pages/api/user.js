import cookie from 'cookie';
import { API_URL } from '../../config/index';

export default async (req, resp) => {
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			resp.status(403).json({ message: 'Not Authorized' });
			return;
		}

		// if we do hv "req.headers.cookie" then we parse it
		const { token } = cookie.parse(req.headers.cookie);
		const strapiResp = await fetch(`${API_URL}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const user = await strapiResp.json();
		console.log('user auth : ', user);

		if (strapiResp.ok) {
			resp.status(200).json({ user });
		} else {
			resp.status(data.statusCode).json({ errMess: 'User Forbidden' });
		}
	} else {
		resp.setHeader('Allow', ['GET']);
		resp.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};

// this route is to get user credentials from strapi. strapi provides a endpoint which returns data related to a logged in user
