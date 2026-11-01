import React from 'react';

const NeonButton = ({ variant = 'primary', size = 'md', fullWidth = false, children, className, ...props }) => {
    const baseClasses = "flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-neon-cyan hover:bg-cyan-600 text-slate-900 shadow-lg glow-shadow-cyan focus:ring-cyan-400",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 hover:border-slate-500 focus:ring-slate-500"
    };

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5",
        lg: "px-8 py-3 text-lg"
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default NeonButton;
