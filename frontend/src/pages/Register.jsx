import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'buyer' 
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await registerUser(formData);
            setSuccess(true);
            // Redirect to login after 2 seconds so they can see the success message
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.message || "Registration failed. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create Account</h2>

                {error && <div className="register-error">{error}</div>}
                {success && <div className="register-success">Registration successful! Redirecting to login...</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="register-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            className="register-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="register-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label>I am a:</label>
                        <select name="role" className="register-select" value={formData.role} onChange={handleChange}>
                            <option value="buyer">Buyer</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>

                    <button type="submit" className="register-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>

                <p className="register-footer">
                    Already have an account? <Link to="/login" className="register-link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;