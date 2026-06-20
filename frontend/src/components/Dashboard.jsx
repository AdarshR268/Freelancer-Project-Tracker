import React from 'react';

function Dashboard({ projects = [] }) {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const ongoingProjects = projects.filter(p => p.status === 'In Progress').length;

  // Workload analysis based on ongoing projects
  const getWorkloadStatus = (ongoingCount) => {
    if (ongoingCount <= 1) {
      return {
        label: 'Available for work',
        className: 'available',
        color: 'var(--success)',
        percentage: Math.max(Math.min((ongoingCount / 5) * 100, 100), 10) // Min 10% for visualization
      };
    } else if (ongoingCount <= 3) {
      return {
        label: 'Optimal load',
        className: 'optimal',
        color: 'var(--accent)',
        percentage: Math.min((ongoingCount / 5) * 100, 100)
      };
    } else if (ongoingCount === 4) {
      return {
        label: 'High Capacity',
        className: 'high',
        color: 'var(--warning)',
        percentage: Math.min((ongoingCount / 5) * 100, 100)
      };
    } else {
      return {
        label: 'Overloaded',
        className: 'overloaded',
        color: 'var(--danger)',
        percentage: 100
      };
    }
  };

  const workload = getWorkloadStatus(ongoingProjects);
  const maxDashOffset = 251.3;
  const dashOffset = maxDashOffset - (workload.percentage / 100) * maxDashOffset;

  return (
    <div className="hero-dashboard">
      {/* Dynamic Capacity Gauge */}
      <div className="gauge-container">
        <svg className="gauge-svg" viewBox="0 0 220 130">
          {/* Background Arc */}
          <path 
            className="gauge-bg-path" 
            d="M 30,110 A 80,80 0 0,1 190,110" 
          />
          {/* Foreground Arc */}
          <path 
            className="gauge-fill-path" 
            d="M 30,110 A 80,80 0 0,1 190,110" 
            style={{ 
              stroke: workload.color, 
              strokeDashoffset: dashOffset 
            }}
          />
        </svg>
        <div className="gauge-reading">{ongoingProjects} Active</div>
        <span className={`gauge-status-tag ${workload.className}`}>
          {workload.label}
        </span>
      </div>

      {/* Numerical Stats Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Total Projects</span>
          <span className="metric-value">{totalProjects}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Ongoing Projects</span>
          <span className="metric-value">{ongoingProjects}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Completed Projects</span>
          <span className="metric-value">{completedProjects}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
