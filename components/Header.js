import Link from 'next/link';
import { useContext } from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import styles from '../styles/Header.module.css';
import Search from './search';
import AuthContext from '../context/authContext';

export default function Header() {
	const { user, logout } = useContext(AuthContext);

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
					<li>
						<Link href="/events">
							<a>Events</a>
						</Link>
					</li>
					{user ? (
						<>
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
						<li>
							<Link href="/auth/login">
								<a className="btn-secondary btn-icon">
									<FaSignInAlt /> Login
								</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}
