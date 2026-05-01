import useFetch from '../hooks/useFetch';
import EntityTable from '../components/EntityTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'User', accessor: 'user' },
  { Header: 'Activity', accessor: 'activity_type' },
  { Header: 'Duration (min)', accessor: 'duration_minutes' },
  { Header: 'Calories', accessor: 'calories_burned' },
  { Header: 'Date', accessor: 'date' },
];

export default function ActivitiesPage() {
  const { data, loading, error } = useFetch('/api/activities/');

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Activities</h2>
          {loading && <div className="alert alert-info">Loading activities...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && <EntityTable columns={columns} items={data} />}
        </div>
      </div>
    </div>
  );
}
