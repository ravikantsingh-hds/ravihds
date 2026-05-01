import useFetch from '../hooks/useFetch';
import EntityTable from '../components/EntityTable';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Name', accessor: 'first_name', render: (item) => `${item.first_name} ${item.last_name}` },
  { Header: 'Fitness Level', accessor: 'fitness_level' },
  { Header: 'Team', accessor: 'team', render: (item) => item.team || 'None' },
];

export default function UsersPage() {
  const { data, loading, error } = useFetch('/api/users/');

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Users</h2>
          {loading && <div className="alert alert-info">Loading users...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && <EntityTable columns={columns} items={data} />}
        </div>
      </div>
    </div>
  );
}
