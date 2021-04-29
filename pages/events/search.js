import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EventItem from '../../components/eventsItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config/index';

export default function Search({ events }) {
	//	console.log('Events: ', events);
	const router = useRouter();

	return (
		<Layout title="Search Results">
			<Link href="/">
				<a> Go Back</a>
			</Link>

			<h1>Search Results for - {router.query.term} </h1>
			{events.length === 0 ? (
				<h1>No events</h1>
			) : (
				events.map((ei) => <EventItem key={ei.id} evt={ei} />)
			)}
		</Layout>
	);
}

export async function getServerSideProps(context) {
	console.log('getStaticProps: ', context.query);
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: context.query.term },
				{ performers_contains: context.query.term },
				{ description_contains: context.query.term },
				{ venue_contains: context.query.term },
			],
		},
	});
	const resp = await fetch(`${API_URL}/events?${query}`);
	const events = await resp.json();

	console.log('search: ', events);

	return {
		props: { events },
	};
}
