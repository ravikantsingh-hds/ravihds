import React, { useState, useEffect } from 'react';
import { fetchJson } from '../api';

export default function WorkoutForm({ workout, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    user: '',
    name: '',
    description: '',
    completed: false,
    date: '',
  });

  useEffect(() => {
    if (workout) {
      setFormData({
        user: workout.user || '',
        name: workout.name || '',
        description: workout.description || '',
        completed: workout.completed || false,
        date: workout.date || '',
      });
    }
  }, [workout]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = workout ? 'PUT' : 'POST';
      const url = workout ? `/api/workouts/${workout.id}/` : '/api/workouts/';
      await fetchJson(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onSave();
    } catch (error) {
      alert('Error saving workout: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">User ID</label>
        <input
          type="text"
          className="form-control"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />
        <label className="form-check-label">Completed</label>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">Save</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
}