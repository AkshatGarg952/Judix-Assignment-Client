import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import judixLogo from '../assets/judix-logo.jpg';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-mesh relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated background orbs */}
            <div className="orb orb-purple w-96 h-96 -top-48 -left-48 animate-float" />
            <div className="orb orb-cyan w-80 h-80 top-1/4 -right-40 animate-float-delayed" />
            <div className="orb orb-pink w-64 h-64 -bottom-32 left-1/4 animate-float" />

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

                {/* Login card */}
                <div className="glass-card rounded-2xl p-8 animate-scale-in">
                    <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
                    <p className="text-slate-400 mb-6">Sign in to continue to your dashboard</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
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
                            <span className="px-4 bg-[#1e1b4b]/60 text-slate-400">New to Judix?</span>
                        </div>
                    </div>

                    <Link
                        to="/register"
                        className="block w-full text-center btn-secondary"
                    >
                        Create an account
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

export default LoginPage;
