# Freelancer Project Tracker

A full-stack project command center designed for freelancers to track and manage client engagements, project status, timelines, and active capacity. 

Built with **Django REST Framework** (Backend), **React + Vite** (Frontend), and **MySQL** (Database).

---

## Project Structure

```
freelancer-project-tracker/
├── backend/                  # Django REST API backend
│   ├── freelancer_tracker/   # Django project settings
│   ├── trackapp/             # DRF app logic (models, views, serializers)
│   └── manage.py
├── frontend/                 # React & Vite frontend
│   ├── src/
│   │   ├── components/       # UI Components (Dashboard, ProjectForm, ProjectList)
│   │   ├── pages/            # Page controllers (Home)
│   │   └── services/         # Axios configuration (api)
│   ├── index.html
│   └── package.json
├── venv/                     # Python virtual environment
├── requirements.txt          # Python backend dependencies
└── README.md
```

---

## Prerequisites

Before setting up the project, ensure you have the following installed:
1. **Python 3.x**
2. **Node.js** (v18 or higher recommended)
3. **MySQL Server** (running locally on port `3306`)

---

## Setup Instructions

### 1. Database Configuration
1. Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or command-line client).
2. Create a new database named `flptdb`:
   ```sql
   CREATE DATABASE flptdb;
   ```
3. By default, the Django project connects using:
   - **Host**: `localhost`
   - **Port**: `3306`
   - **User**: `root`
   - **Password**: `""` (empty)

### 2. Backend Setup
1. Open a terminal at the root of the project.
2. Activate the Python virtual environment:
   ```powershell
   # Windows (PowerShell)
   .\venv\Scripts\Activate.ps1
   
   # macOS / Linux
   source venv/bin/activate
   ```
3. Install backend dependencies (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```
4. Run Django migrations to create the database tables:
   ```bash
   python backend/manage.py migrate
   ```
5. Start the backend REST API development server:
   ```bash
   python backend/manage.py runserver
   ```
   The API will be available at: `http://127.0.0.1:8000/api/`

---

### 3. Frontend Setup
1. Open a separate terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Open the development link printed in the console (usually `http://localhost:5173`) in your web browser.

---

## Verification & Usage Checklist

Once both servers are running, test the application through these interactive features:
- **Dashboard Metric Counts**: Monitor Total Projects, Ongoing Projects, and Completed Projects in real-time.
- **Dynamic Workload Capacity Gauge**: A custom SVG meter analyzes your active "In Progress" workload and displays status markers:
  - `0 - 1 Projects`: *Available for work* (Soft green arc)
  - `2 - 3 Projects`: *Optimal load* (Vibrant purple arc)
  - `4 Projects`: *High Capacity* (Orange arc)
  - `5+ Projects`: *Overloaded / Do Not Distribute* (Pulsing crimson warning)
- **Live Duplicate Check**: Adding or editing a project to match an existing project's name triggers a visual warning indicator and disables the submit action to prevent duplication.
- **Progress Tracking**: Completion percentages are derived dynamically on the database model level based on status selection (Not Started = 0%, In Progress = 50%, Completed = 100%) and rendered as visual gradient bars on card views.
- **Dark/Light Mode**: Adjust your operating system theme preferences to verify the slate design system shifts colors automatically.
