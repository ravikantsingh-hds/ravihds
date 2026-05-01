import useFetch from '../hooks/useFetch';
import EntityTable from '../components/EntityTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'User', accessor: 'user' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Description', accessor: 'description' },
  { Header: 'Completed', accessor: 'completed', render: (item) => (item.completed ? 'Yes' : 'No') },
  { Header: 'Date', accessor: 'date' },
];

export default function WorkoutsPage() {
  const { data, loading, error } = useFetch('/api/workouts/');

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Workouts</h2>
          {loading && <div className="alert alert-info">Loading workouts...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && <EntityTable columns={columns} items={data} />}
        </div>
      </div>
    </div>
  );
}
