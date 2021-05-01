import cookie from 'cookie';
import { API_URL } from '../../config/index';

export default async (req, resp) => {
	if (req.method === 'POST') {
		console.log('login api : ', req.body);
		const { identifier, password } = req.body;

		const strapiResp = await fetch(`${API_URL}/auth/local`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ identifier, password }),
		});
		const data = await strapiResp.json();
		console.log('api login auth : ', data);

		if (strapiResp.ok) {
			//set httpOnly cookie in server, on success from strapi end
			resp.setHeader(
				'Set-Cookie',
				cookie.serialize('token', data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 60 * 60 * 24 * 7, // 1 week
					sameSite: 'strict',
					path: '/',
				})
			);

			resp.status(200).json({ user: data.user });
		} else {
			//if error , from strapi end
			resp
				.status(data.statusCode)
				.json({ errMess: data.message[0].messages[0].message });
		}
	} else {
		resp.setHeader('Allow', ['POST']);
		resp.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
