import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Toast from '../components/Toast';
import { taskService } from '../api/services';

const DashboardPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [deletingTask, setDeletingTask] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        search: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                ...(filters.status && { status: filters.status }),
                ...(filters.priority && { priority: filters.priority }),
                ...(filters.search && { search: filters.search })
            };
            const response = await taskService.getTasks(params);
            setTasks(response.data.tasks);
            setPagination(prev => ({
                ...prev,
                total: response.data.pagination.total,
                pages: response.data.pagination.pages
            }));
        } catch (err) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.limit, filters]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Calculate stats
    const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
    };

    const handleCreateOrUpdate = async (data, taskId) => {
        try {
            if (taskId) {
                await taskService.updateTask(taskId, data);
                setSuccess('Task updated successfully');
            } else {
                await taskService.createTask(data);
                setSuccess('Task created successfully');
            }
            fetchTasks();
            setEditingTask(null);
        } catch (err) {
            throw err;
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDelete = (task) => {
        setDeletingTask(task);
    };

    const confirmDelete = async () => {
        if (!deletingTask) return;

        try {
            await taskService.deleteTask(deletingTask._id);
            setSuccess('Task deleted successfully');
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task');
        } finally {
            setDeletingTask(null);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleSearch = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const StatCard = ({ icon, label, value, color }) => (
        <div className="stat-card group">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
                <div>
                    <p className="text-slate-400 text-sm">{label}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-mesh">
            <Navbar />

            {error && <Toast message={error} type="error" onClose={() => setError('')} />}
            {success && <Toast message={success} type="success" onClose={() => setSuccess('')} />}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                        <p className="text-slate-400 mt-1">Welcome back! Manage your tasks efficiently</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="btn-primary flex items-center gap-2 self-start sm:self-auto"
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Task
                        </span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                        label="Total Tasks"
                        value={stats.total}
                        color="bg-gradient-primary"
                    />
                    <StatCard
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="Pending"
                        value={stats.pending}
                        color="bg-gradient-warning"
                    />
                    <StatCard
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        label="In Progress"
                        value={stats.inProgress}
                        color="bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                    <StatCard
                        icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        label="Completed"
                        value={stats.completed}
                        color="bg-gradient-success"
                    />
                </div>

                {/* Filters */}
                <div className="glass-card rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={filters.search}
                                onChange={handleSearch}
                                className="form-input !pl-14"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="form-select min-w-[140px]"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <select
                                name="priority"
                                value={filters.priority}
                                onChange={handleFilterChange}
                                className="form-select min-w-[140px]"
                            >
                                <option value="">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tasks Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="glass-card rounded-xl p-5">
                                <div className="skeleton h-6 w-3/4 mb-3"></div>
                                <div className="skeleton h-4 w-full mb-2"></div>
                                <div className="skeleton h-4 w-2/3 mb-4"></div>
                                <div className="flex gap-2">
                                    <div className="skeleton h-6 w-20 rounded-full"></div>
                                    <div className="skeleton h-6 w-16"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/10 mb-6">
                            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
                        <p className="text-slate-400 mb-6 max-w-sm mx-auto">Get started by creating your first task and boost your productivity</p>
                        <button
                            onClick={openCreateModal}
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Your First Task
                            </span>
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map((task, index) => (
                                <div key={task._id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                    <TaskCard
                                        task={task}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>

                        {pagination.pages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                    disabled={pagination.page === 1}
                                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <div className="flex items-center gap-1 px-4">
                                    {[...Array(pagination.pages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                                            className={`w-10 h-10 rounded-lg font-medium transition-all ${pagination.page === i + 1
                                                ? 'bg-gradient-primary text-white'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                    disabled={pagination.page === pagination.pages}
                                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                }}
                onSubmit={handleCreateOrUpdate}
                task={editingTask}
            />

            <DeleteConfirmModal
                isOpen={!!deletingTask}
                onClose={() => setDeletingTask(null)}
                onConfirm={confirmDelete}
                taskTitle={deletingTask?.title}
            />
        </div>
    );
};

export default DashboardPage;
