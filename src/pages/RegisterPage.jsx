import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import judixLogo from '../assets/judix-logo.jpg';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-mesh relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated background orbs */}
            <div className="orb orb-cyan w-96 h-96 -top-48 -right-48 animate-float" />
            <div className="orb orb-purple w-80 h-80 top-1/3 -left-40 animate-float-delayed" />
            <div className="orb orb-pink w-64 h-64 -bottom-32 right-1/4 animate-float" />

            {error && <Toast message={error} type="error" onClose={() => setError('')} />}

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo and branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden mb-4 shadow-lg shadow-purple-500/30">
                        <img src={judixLogo} alt="Judix Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-4xl font-bold text-gradient mb-2">Judix</h1>
                    <p className="text-slate-400">Smart Task Management</p>
                </div>

                {/* Register card */}
                <div className="glass-card rounded-2xl p-8 animate-scale-in">
                    <h2 className="text-2xl font-semibold text-white mb-2">Create your account</h2>
                    <p className="text-slate-400 mb-6">Start managing your tasks efficiently</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="••••••••"
                            />
                            <p className="text-slate-500 text-xs mt-1">Minimum 6 characters</p>
                        </div>

                        <div>
                            <label className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[#1e1b4b]/60 text-slate-400">Already have an account?</span>
                        </div>
                    </div>

                    <Link
                        to="/login"
                        className="block w-full text-center btn-secondary"
                    >
                        Sign in instead
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-500 text-sm mt-8">
                    © 2026 Judix. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
