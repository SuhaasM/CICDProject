import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom'; // <-- Import Link
import './App.css';

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <h1>CICD Project - LMS</h1>
      <div className="card">
        {user ? (
          <div>
            <h2>Welcome, {user.email}!</h2>
            <p>Your assigned role is: <strong>{user.role}</strong></p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          // --- Updated Logged-Out View ---
          <div>
            <h2>Please Log In or Sign Up</h2>
            <nav>
              <Link to="/login">
                <button>Go to Login</button>
              </Link>
              &nbsp; {/* Adds a little space */}
              <Link to="/signup">
                <button>Go to Signup</button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

export default App;