import EventItem from '../components/eventsItem';
import Layout from '../components/Layout';
import { API_URL } from '../config/index';

export default function HomePage({ events }) {
	//	console.log('Events: ', events);

	return (
		<Layout>
			{events.length === 0 ? (
				<h1>No events</h1>
			) : (
				events.map((ei) => <EventItem key={ei.id} evt={ei} />)
			)}
		</Layout>
	);
}

export async function getStaticProps() {
	const resp = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=10`);
	const events = await resp.json();

	//	console.log('home -getStaticProps: ', events);

	return {
		props: { events },
		revalidate: 5,
	};
}
