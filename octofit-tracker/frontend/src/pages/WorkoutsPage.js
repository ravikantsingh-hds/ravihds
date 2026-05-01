import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import EntityTable from '../components/EntityTable';
import WorkoutForm from '../components/WorkoutForm';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'User', accessor: 'user' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Description', accessor: 'description' },
  { Header: 'Completed', accessor: 'completed', render: (item) => (item.completed ? 'Yes' : 'No') },
  { Header: 'Date', accessor: 'date' },
];

export default function WorkoutsPage() {
  const { data, loading, error, refetch } = useFetch('/api/workouts/');
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleCreate = () => {
    setSelectedWorkout(null);
    setShowModal(true);
  };

  const handleEdit = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleSave = () => {
    setShowModal(false);
    refetch();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const actions = (item) => (
    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(item)}>
      Edit
    </button>
  );

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title">Workouts</h2>
            <button className="btn btn-primary" onClick={handleCreate}>
              Create New Workout
            </button>
          </div>
          {loading && <div className="alert alert-info">Loading workouts...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && <EntityTable columns={columns} items={data} actions={actions} />}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedWorkout ? 'Edit Workout' : 'Create Workout'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <WorkoutForm workout={selectedWorkout} onSave={handleSave} onCancel={handleCancel} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop show"></div>}
    </div>
  );
}
