import Link from 'next/link';
import Layout from '../../components/Layout';
import EventItem from '../../components/eventsItem';
//import Pagination from '../../components/Pagination';
import { API_URL } from '../../config/index';
const PER_PAGE = 4;

export default function EventsPage({ events, page, total }) {
	const lastPage = Math.ceil(total / PER_PAGE);

	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}

			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className="btn-secondary">Prev</a>
				</Link>
			)}
			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className="btn-secondary">Next</a>
				</Link>
			)}
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	// Calculate start page
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
	console.log('start : ', start);

	// Fetch total/count
	const totalRes = await fetch(`${API_URL}/events/count`);
	const total = await totalRes.json();

	// Fetch events
	const eventRes = await fetch(
		`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
	);
	const events = await eventRes.json();

	return {
		props: { events, page: +page, total },
	};
}
