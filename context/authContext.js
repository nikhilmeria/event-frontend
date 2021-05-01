import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '../config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => checkUserLoggedIn(), []);

	// Register user
	const register = async ({ username, email, password }) => {
		const resp = await fetch(`${NEXT_URL}/api/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		});
		const data = await resp.json();
		console.log('register auth : ', data);

		if (resp.ok) {
			console.log('user registered');
			setUser(data.user);
			router.push('/events');
		} else {
			//display err mess to client
			setError(data.errMess);
			setError(null);
		}
	};

	// Login user
	const login = async ({ email: identifier, password }) => {
		const resp = await fetch(`${NEXT_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ identifier, password }),
		});
		const data = await resp.json();
		console.log('login auth : ', data);

		if (resp.ok) {
			setUser(data.user);
			router.push('/events');
		} else {
			//display err mess to client
			setError(data.errMess);
			setError(null);
		}
	};

	// Logout user
	const logout = async () => {
		const resp = await fetch(`${NEXT_URL}/api/logout`, {
			method: 'POST',
		});

		if (resp.ok) {
			setUser(null);
			router.push('/');
		}

		console.log('Logout done');
	};

	// Check if user is logged in (persist user session in app)
	const checkUserLoggedIn = async (user) => {
		const resp = await fetch(`${NEXT_URL}/api/user`);
		const usr = await resp.json();

		console.log('checkUserLoggedIn : ', usr);

		if (resp.ok) {
			setUser(usr.user);
		} else {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider value={{ user, error, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
