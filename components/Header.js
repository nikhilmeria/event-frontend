import Link from 'next/link';
import { useContext } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import styles from '../styles/Header.module.css';
import Search from './search';
import AuthContext from '../context/authContext';

export default function Header() {
	const { user, logout } = useContext(AuthContext);
	//console.log('user email - header : ', user);

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">
					<a>DJ Events</a>
				</Link>
			</div>

			<Search />

			<nav>
				<ul>
					{user ? (
						<>
							<li>
								<Link href="/events">
									<a>My Events</a>
								</Link>
							</li>
							<li>
								<Link href="/events/add">
									<a>Add Event</a>
								</Link>
							</li>
							<li>
								<button onClick={() => logout()} className="btn-secondary btn-icon">
									<FaSignOutAlt /> Logout
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link href="/auth/login">
									<a className="btn-secondary btn-icon">
										<FaSignInAlt /> Login
									</a>
								</Link>
							</li>
							<li>
								<Link href="/auth/register">
									<a className="btn-secondary btn-icon">
										<FaUserPlus /> Register
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}
