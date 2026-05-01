import useFetch from '../hooks/useFetch';
import EntityTable from '../components/EntityTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'User', accessor: 'user' },
  { Header: 'Score', accessor: 'score' },
  { Header: 'Rank', accessor: 'rank' },
];

export default function LeaderboardPage() {
  const { data, loading, error } = useFetch('/api/leaderboard/');

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Leaderboard</h2>
          {loading && <div className="alert alert-info">Loading leaderboard...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && <EntityTable columns={columns} items={data} />}
        </div>
      </div>
    </div>
  );
}
