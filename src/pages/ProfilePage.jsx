import { useState } from 'react';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { authService } from '../api/services';

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await authService.updateProfile(formData);
            updateUser(response.data.user);
            setSuccess('Profile updated successfully');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-mesh">
            <Navbar />

            {error && <Toast message={error} type="error" onClose={() => setError('')} />}
            {success && <Toast message={success} type="success" onClose={() => setSuccess('')} />}

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-white mb-8 animate-fade-in">Profile Settings</h1>

                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
                    {/* Profile Header */}
                    <div className="p-8 border-b border-purple-500/10 bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* Avatar with gradient ring */}
                            <div className="avatar-ring">
                                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg shadow-purple-500/30">
                                    <span className="text-3xl font-bold text-white">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-semibold text-white">{user?.name}</h2>
                                <p className="text-slate-400 mt-1">{user?.email}</p>
                                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                    <span className="text-sm text-purple-300">Active Member</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div>
                            <label className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={user?.email}
                                disabled
                                className="form-input opacity-60 cursor-not-allowed"
                            />
                            <p className="text-slate-500 text-sm mt-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Email cannot be changed
                            </p>
                        </div>

                        <div className="pt-4 border-t border-purple-500/10">
                            <label className="form-label">
                                Account Information
                            </label>
                            <div className="mt-2">
                                <div className="p-4 rounded-xl bg-slate-900/50 border border-purple-500/10">
                                    <p className="text-slate-500 text-sm">Account Status</p>
                                    <p className="text-green-400 font-medium mt-1 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                        Active
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
