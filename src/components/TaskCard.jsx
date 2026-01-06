const TaskCard = ({ task, onEdit, onDelete }) => {
    const statusColors = {
        'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'completed': 'bg-green-500/20 text-green-400 border-green-500/30'
    };

    const priorityColors = {
        'low': 'bg-gray-500/20 text-gray-400',
        'medium': 'bg-orange-500/20 text-orange-400',
        'high': 'bg-red-500/20 text-red-400'
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white truncate flex-1 mr-2">
                    {task.title}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
            </div>

            {task.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {task.description}
                </p>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
                        {task.status.replace('-', ' ')}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {formatDate(task.createdAt)}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-gray-400 hover:text-indigo-400 transition-colors p-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="text-gray-400 hover:text-red-400 transition-colors p-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
