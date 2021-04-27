import Layout from '../../components/Layout';
import { API_URL } from '../../config/index';

export default function EventPage({ events }) {
	return (
		<Layout>
			<h1>My Event - {events.name}</h1>
		</Layout>
	);
}

export async function getStaticProps({ params: { slug } }) {
	const resp = await fetch(`${API_URL}/api/events/${slug}`);
	const events = await resp.json();

	return {
		props: { events: events[0] },
	};
}

export async function getStaticPaths() {
	const resp = await fetch(`${API_URL}/api/events`);
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
