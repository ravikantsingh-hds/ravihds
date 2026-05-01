import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container py-5">
      <div className="alert alert-warning">
        <h4 className="alert-heading">Page not found</h4>
        <p>The page you are looking for does not exist.</p>
        <hr />
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
