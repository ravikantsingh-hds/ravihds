import useFetch from '../hooks/useFetch';
import EntityTable from '../components/EntityTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Team Name', accessor: 'name' },
  { Header: 'Description', accessor: 'description' },
];

export default function TeamsPage() {
  const { data, loading, error } = useFetch('/api/teams/');

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Teams</h2>
          {loading && <div className="alert alert-info">Loading teams...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && <EntityTable columns={columns} items={data} />}
        </div>
      </div>
    </div>
  );
}
