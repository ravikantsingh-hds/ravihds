import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import EntityTable from '../components/EntityTable';
import ActivityForm from '../components/ActivityForm';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'User', accessor: 'user' },
  { Header: 'Activity', accessor: 'activity_type' },
  { Header: 'Duration (min)', accessor: 'duration_minutes' },
  { Header: 'Calories', accessor: 'calories_burned' },
  { Header: 'Date', accessor: 'date' },
];

export default function ActivitiesPage() {
  const { data, loading, error, refetch } = useFetch('/api/activities/');
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleCreate = () => {
    setSelectedActivity(null);
    setShowModal(true);
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
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
            <h2 className="card-title">Activities</h2>
            <button className="btn btn-primary" onClick={handleCreate}>
              Create New Activity
            </button>
          </div>
          {loading && <div className="alert alert-info">Loading activities...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && <EntityTable columns={columns} items={data} actions={actions} />}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedActivity ? 'Edit Activity' : 'Create Activity'}</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <ActivityForm activity={selectedActivity} onSave={handleSave} onCancel={handleCancel} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop show"></div>}
    </div>
  );
}
