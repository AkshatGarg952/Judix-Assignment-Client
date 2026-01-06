import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="text-xl font-bold text-indigo-400">
                            Judix
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 text-sm">
                            {user?.name}
                        </span>
                        <Link
                            to="/profile"
                            className="text-gray-300 hover:text-white text-sm transition-colors"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
