import { useEffect, useState } from 'react';

const Toast = ({ message, type = 'error', onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const duration = 4000;
        const interval = 50;
        const decrement = (100 * interval) / duration;

        const progressTimer = setInterval(() => {
            setProgress(prev => Math.max(0, prev - decrement));
        }, interval);

        const closeTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => {
            clearInterval(progressTimer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    const config = {
        error: {
            bg: 'from-red-500 to-rose-600',
            border: 'border-red-400/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            progressBg: 'bg-red-300'
        },
        success: {
            bg: 'from-emerald-500 to-green-600',
            border: 'border-emerald-400/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            progressBg: 'bg-emerald-300'
        },
        warning: {
            bg: 'from-amber-500 to-orange-600',
            border: 'border-amber-400/30',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            progressBg: 'bg-amber-300'
        }
    };

    const currentConfig = config[type] || config.error;

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-x-full'
                }`}
        >
            <div className={`bg-gradient-to-r ${currentConfig.bg} text-white rounded-xl shadow-2xl overflow-hidden border ${currentConfig.border} min-w-[300px] max-w-md`}>
                <div className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            {currentConfig.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-relaxed">{message}</p>
                        </div>
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(onClose, 300);
                            }}
                            className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-black/20">
                    <div
                        className={`h-full ${currentConfig.progressBg} transition-all duration-50 ease-linear`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Toast;
