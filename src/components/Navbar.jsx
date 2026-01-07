import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import judixLogo from '../assets/judix-logo.jpg';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass border-b border-purple-500/10 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/dashboard" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-lg overflow-hidden shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                                <img src={judixLogo} alt="Judix Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold text-gradient">Judix</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                to="/dashboard"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/dashboard')
                                    ? 'bg-purple-500/20 text-purple-300'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive('/profile')
                                    ? 'bg-purple-500/20 text-purple-300'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                            >
                                Profile
                            </Link>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* User info */}
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-slate-300 text-sm font-medium">
                                {user?.name}
                            </span>
                        </div>

                        {/* Mobile nav links */}
                        <div className="flex md:hidden items-center gap-1">
                            <Link
                                to="/profile"
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all border border-slate-600/50 hover:border-slate-500"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
