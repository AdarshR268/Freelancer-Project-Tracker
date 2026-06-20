import React from 'react';

function ProjectList({ projects = [], onEdit, onDelete, editingProjectId }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'completed';
      case 'In Progress':
        return 'in-progress';
      case 'Not Started':
      default:
        return 'not-started';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.5, marginBottom: '16px' }}
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <h3>No projects tracked yet</h3>
        <p>Use the form to add your first freelance project and start tracking progress!</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => {
        const isEditing = editingProjectId === project.id;
        const statusClass = getStatusClass(project.status);
        
        return (
          <div 
            key={project.id} 
            className={`project-card ${isEditing ? 'editing-active' : ''}`}
            style={isEditing ? { borderColor: 'var(--accent)', borderWidth: '2px' } : {}}
          >
            <div className="project-card-header">
              <div className="project-info">
                <h4 className="project-title">{project.project_name}</h4>
                <span className="project-client">Client: <strong>{project.client_name}</strong></span>
              </div>
              <span className={`status-badge ${statusClass}`}>
                {project.status}
              </span>
            </div>

            <div className="project-progress-section">
              <div className="progress-header">
                <span>Completion progress</span>
                <span className="progress-percentage">{project.progress}%</span>
              </div>
              <div className="progress-track">
                <div 
                  className={`progress-fill ${statusClass}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="project-meta">
              <div className="project-date">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Started: {formatDate(project.start_date)}</span>
              </div>
              
              <div className="project-card-actions">
                <button 
                  onClick={() => onEdit(project)} 
                  className="btn btn-secondary btn-sm"
                  title="Edit Project"
                  disabled={isEditing}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(project.id)} 
                  className="btn btn-danger btn-sm"
                  title="Delete Project"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
