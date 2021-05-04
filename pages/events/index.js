import Layout from '../../components/Layout';
import EventItem from '../../components/eventsItem';
import { API_URL } from '../../config/index';
import { parseCookies } from '../../utility/index';

export default function EventsPage({ events }) {
	return (
		<Layout>
			<h1>My Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);
	//console.log('token - /pages/events/index : ', token);

	const res = await fetch(`${API_URL}/events/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const events = await res.json();
	//console.log('events - /pages/events/index : ', events);

	return {
		props: {
			events,
		},
	};
}
