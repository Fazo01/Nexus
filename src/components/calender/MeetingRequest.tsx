// components/calendar/MeetingRequest.jsx
import React, { useState } from 'react';

const MeetingRequest = ({ isOpen, onClose, onSubmit, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30,
    attendees: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      startTime: selectedDate,
      endTime: new Date(selectedDate.getTime() + formData.duration * 60000)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Schedule Meeting</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Meeting Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={120}>2 hours</option>
          </select>
          <button type="submit">Schedule Meeting</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};