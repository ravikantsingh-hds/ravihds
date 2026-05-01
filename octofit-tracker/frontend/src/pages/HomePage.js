import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/workouts', label: 'Workouts' },
  { path: '/leaderboard', label: 'Leaderboard' },
];

export default function HomePage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h1 className="card-title">OctoFit Tracker</h1>
              <p className="lead">
                Welcome to the OctoFit Tracker app for Mergington High School. Use the navigation menu to view users, teams, activities, workouts, and the leaderboard.
              </p>
              <div className="mb-4">
                <h5>API Endpoints</h5>
                <ul>
                  <li><code>/api/users/</code></li>
                  <li><code>/api/teams/</code></li>
                  <li><code>/api/activities/</code></li>
                  <li><code>/api/workouts/</code></li>
                  <li><code>/api/leaderboard/</code></li>
                </ul>
              </div>
              <div>
                <h5>Pages</h5>
                <div className="d-flex flex-wrap gap-2">
                  {links.slice(1).map((link) => (
                    <NavLink key={link.path} to={link.path} className="btn btn-outline-primary">
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
