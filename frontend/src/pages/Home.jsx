import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Dashboard from '../components/Dashboard';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';

function Home() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Auto-clear notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('projects/');
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Could not connect to the backend server. Make sure the API is running.');
      showNotification('Failed to load projects.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProject) {
        // Update project (PUT)
        const response = await api.put(`projects/${editingProject.id}/`, formData);
        showNotification(`Project "${response.data.project_name}" updated successfully!`, 'success');
        setEditingProject(null);
      } else {
        // Create project (POST)
        const response = await api.post('projects/', formData);
        showNotification(`Project "${response.data.project_name}" added successfully!`, 'success');
      }
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      showNotification('Error saving project. Please try again.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const projectToDelete = projects.find((p) => p.id === id);
    if (!projectToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the project "${projectToDelete.project_name}"?`
    );

    if (confirmDelete) {
      try {
        await api.delete(`projects/${id}/`);
        showNotification(`Project "${projectToDelete.project_name}" deleted.`, 'warning');
        // If the project currently being edited is deleted, cancel editing
        if (editingProject && editingProject.id === id) {
          setEditingProject(null);
        }
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
        showNotification('Error deleting project. Please try again.', 'error');
      }
    }
  };

  const handleEditSelect = (project) => {
    setEditingProject(project);
    // Smooth scroll to the form card on mobile devices
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  return (
    <>
      {/* Toast Notifications */}
      {notification && (
        <div className="notification-container">
          <div className={`toast toast-${notification.type}`}>
            <span className="toast-message">{notification.message}</span>
          </div>
        </div>
      )}

      {/* App Header */}
      <header className="app-header">
        <div className="app-title-group">
          <h1>Freelancer Project Tracker</h1>
          <p className="app-subtitle">Organize client projects, track status, and monitor overall progress</p>
        </div>
      </header>

      {/* Dashboard Metrics Section */}
      <section>
        <Dashboard projects={projects} />
      </section>

      {/* Main Workspace Layout */}
      <div className="workspace-layout">
        {/* Left Column: Projects List */}
        <section>
          <div className="section-title">
            <h2>Active Projects</h2>
            {loading && <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 500 }}>Refreshing...</span>}
          </div>
          
          {error ? (
            <div className="empty-state" style={{ borderColor: 'var(--danger-border)' }}>
              <h3 style={{ color: 'var(--danger)' }}>Connection Error</h3>
              <p>{error}</p>
              <button onClick={fetchProjects} className="btn btn-secondary btn-sm" style={{ marginTop: '16px' }}>
                Retry Connection
              </button>
            </div>
          ) : loading && projects.length === 0 ? (
            <div className="empty-state">
              <h3>Loading projects...</h3>
              <p>Fetching project tracking details from database.</p>
            </div>
          ) : (
            <ProjectList
              projects={projects}
              onEdit={handleEditSelect}
              onDelete={handleDelete}
              editingProjectId={editingProject ? editingProject.id : null}
            />
          )}
        </section>

        {/* Right Column: Add/Edit Project Form */}
        <section>
          <ProjectForm
            onSubmit={handleFormSubmit}
            editingProject={editingProject}
            onCancel={handleCancelEdit}
            projects={projects}
          />
        </section>
      </div>
    </>
  );
}

export default Home;
