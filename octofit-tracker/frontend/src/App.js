import './App.css';

function App() {
  const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title">OctoFit Tracker</h1>
              <p className="lead">
                Welcome to the OctoFit Tracker app for Mergington High School.
                Log workouts, track teams, and follow leaderboard progress.
              </p>
              <div className="mb-4">
                <h5>Backend API</h5>
                <p className="mb-1">Base URL: <code>{apiBase}/api/</code></p>
                <div className="list-group">
                  <a href={`${apiBase}/api/users/`} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer">
                    Users
                  </a>
                  <a href={`${apiBase}/api/teams/`} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer">
                    Teams
                  </a>
                  <a href={`${apiBase}/api/activities/`} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer">
                    Activities
                  </a>
                  <a href={`${apiBase}/api/workouts/`} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer">
                    Workouts
                  </a>
                  <a href={`${apiBase}/api/leaderboard/`} className="list-group-item list-group-item-action" target="_blank" rel="noreferrer">
                    Leaderboard
                  </a>
                </div>
              </div>
              <div>
                <h5>Next steps</h5>
                <ul>
                  <li>Connect this frontend to the Django REST API.</li>
                  <li>Build workout logging and leaderboard UI pages.</li>
                  <li>Enable user registration and team management.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
