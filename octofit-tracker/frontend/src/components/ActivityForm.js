import React, { useState, useEffect } from 'react';
import { fetchJson } from '../api';

export default function ActivityForm({ activity, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    user: '',
    activity_type: '',
    duration_minutes: '',
    calories_burned: '',
    date: '',
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        user: activity.user || '',
        activity_type: activity.activity_type || '',
        duration_minutes: activity.duration_minutes || '',
        calories_burned: activity.calories_burned || '',
        date: activity.date || '',
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = activity ? 'PUT' : 'POST';
      const url = activity ? `/api/activities/${activity.id}/` : '/api/activities/';
      await fetchJson(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onSave();
    } catch (error) {
      alert('Error saving activity: ' + error.message);
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
        <label className="form-label">Activity Type</label>
        <input
          type="text"
          className="form-control"
          name="activity_type"
          value={formData.activity_type}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Duration (minutes)</label>
        <input
          type="number"
          className="form-control"
          name="duration_minutes"
          value={formData.duration_minutes}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Calories Burned</label>
        <input
          type="number"
          className="form-control"
          name="calories_burned"
          value={formData.calories_burned}
          onChange={handleChange}
          required
        />
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