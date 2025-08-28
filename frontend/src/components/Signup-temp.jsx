import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // We use a role of 'student' for this basic signup form
            await axios.post('http://localhost:3001/api/auth/signup', { email, password, username, role: 'student' });
            
            // After successful signup, log the user in automatically
            const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
            login(response.data);
            navigate('/'); // Redirect to homepage after successful signup and login
            
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default Signup; // <-- This is the line that was missing