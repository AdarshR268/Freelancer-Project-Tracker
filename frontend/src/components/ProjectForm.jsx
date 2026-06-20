import React, { useState, useEffect } from 'react';

function ProjectForm({ onSubmit, editingProject, onCancel, projects = [] }) {
  const [formData, setFormData] = useState({
    project_name: '',
    client_name: '',
    start_date: '',
    status: 'Not Started'
  });
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');

  // Live duplicate name check
  useEffect(() => {
    const trimmedName = formData.project_name.trim().toLowerCase();
    if (!trimmedName) {
      setNameError('');
      return;
    }

    const isDuplicate = projects.some(p => 
      p.project_name.trim().toLowerCase() === trimmedName &&
      (!editingProject || p.id !== editingProject.id)
    );

    if (isDuplicate) {
      setNameError('A project with this name is already registered.');
    } else {
      setNameError('');
    }
  }, [formData.project_name, projects, editingProject]);

  // Update form fields when editingProject changes
  useEffect(() => {
    if (editingProject) {
      setFormData({
        project_name: editingProject.project_name || '',
        client_name: editingProject.client_name || '',
        start_date: editingProject.start_date || '',
        status: editingProject.status || 'Not Started'
      });
      setError('');
    } else {
      setFormData({
        project_name: '',
        client_name: '',
        start_date: '',
        status: 'Not Started'
      });
      setError('');
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Block submission if there is a live validation error
    if (nameError) {
      setError(nameError);
      return;
    }

    // Client-side validations
    if (!formData.project_name.trim()) {
      setError('Project Name is required.');
      return;
    }
    if (!formData.client_name.trim()) {
      setError('Client Name is required.');
      return;
    }
    if (!formData.start_date) {
      setError('Start Date is required.');
      return;
    }

    onSubmit(formData);

    // If not editing, clear the form on successful submit
    if (!editingProject) {
      setFormData({
        project_name: '',
        client_name: '',
        start_date: '',
        status: 'Not Started'
      });
    }
  };

  return (
    <div className="form-card">
      <h3 className="section-title">
        {editingProject ? 'Edit Project' : 'Add New Project'}
      </h3>
      
      <form onSubmit={handleSubmit} className="project-form">
        {error && <div className="status-badge not-started" style={{ padding: '8px 12px', textAlign: 'center', width: '100%' }}>{error}</div>}
        
        <div className="form-group">
          <label className="form-label" htmlFor="project_name">Project Name</label>
          <input
            type="text"
            id="project_name"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            placeholder="e.g. Website Redesign"
            className={`form-input ${nameError ? 'invalid' : ''}`}
            required
          />
          {nameError && (
            <span className="form-error-msg">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {nameError}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="client_name">Client Name</label>
          <input
            type="text"
            id="client_name"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            placeholder="e.g. Acme Corp"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ flex: 1 }}
            disabled={!!nameError}
          >
            {editingProject ? 'Save Changes' : 'Add Project'}
          </button>
          {editingProject && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
