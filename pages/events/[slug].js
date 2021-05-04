import { useContext, useEffect } from 'react';
import Layout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { API_URL, NEXT_URL } from '../../config/index';
import styles from '../../styles/Event.module.css';
import AuthContext from '../../context/authContext';

export default function EventPage({ evt }) {
	const router = useRouter();
	const { checkUserLoggedIn, user } = useContext(AuthContext);
	//console.log('email 1 - slug : ', evt.user.email);
	//console.log('email 2 - slug : ', user.email);

	useEffect(() => {
		usrData();
	}, []);

	const usrData = async () => {
		await checkUserLoggedIn();
	};

	const deleteEvent = async (e) => {
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/events/${evt.id}`, {
				method: 'DELETE',
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message);
			} else {
				router.push('/events');
			}
		}
	};

	return (
		<Layout>
			<div className={styles.event}>
				{user !== null && user.email === evt.user.email && (
					<div className={styles.controls}>
						<Link href={`/events/edit/${evt.id}`}>
							<a>
								<FaPencilAlt /> Edit Event
							</a>
						</Link>
						<a href="#" className={styles.delete} onClick={deleteEvent}>
							<FaTimes /> Delete Event
						</a>
					</div>
				)}

				<span>
					{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
				</span>
				<h1>{evt.name}</h1>
				<ToastContainer />
				{evt.image && (
					<div className={styles.image}>
						<Image src={evt.image.url} width={960} height={600} />
					</div>
				)}

				<h3>Performers:</h3>
				<p>{evt.performers}</p>
				<h3>Description:</h3>
				<p>{evt.description}</p>
				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>

				<Link href="/events">
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
}

export async function getStaticProps({ params: { slug } }) {
	const resp = await fetch(`${API_URL}/events/?slug=${slug}`);
	const events = await resp.json();

	//	console.log('evtPage : ', events);
	return {
		props: { evt: events[0] },
	};
}

export async function getStaticPaths() {
	const resp = await fetch(`${API_URL}/events`);
	const events = await resp.json();

	const paths = events.map((ei) => ({
		params: {
			slug: ei.slug,
		},
	}));

	//console.log('paths : ', paths);

	return {
		paths: paths,
		fallback: false,
	};
}
