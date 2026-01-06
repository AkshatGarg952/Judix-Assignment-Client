const TaskCard = ({ task, onEdit, onDelete }) => {
    const statusConfig = {
        'pending': {
            class: 'badge-pending',
            icon: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        'in-progress': {
            class: 'badge-in-progress',
            icon: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        'completed': {
            class: 'badge-completed',
            icon: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )
        }
    };

    const priorityConfig = {
        'low': 'badge-low',
        'medium': 'badge-medium',
        'high': 'badge-high'
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const status = statusConfig[task.status] || statusConfig['pending'];

    return (
        <div className="glass-card rounded-xl p-5 card-hover group">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white truncate flex-1 mr-2 group-hover:text-purple-300 transition-colors">
                    {task.title}
                </h3>
                <span className={`badge ${priorityConfig[task.priority]} capitalize`}>
                    {task.priority}
                </span>
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-purple-500/10">
                <div className="flex items-center gap-3">
                    <span className={`badge ${status.class} flex items-center gap-1.5`}>
                        {status.icon}
                        <span className="capitalize">{task.status.replace('-', ' ')}</span>
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-xs mr-2">
                        {formatDate(task.createdAt)}
                    </span>
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all"
                        title="Edit task"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Delete task"
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
