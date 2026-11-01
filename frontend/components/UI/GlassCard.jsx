import React from 'react';

const GlassCard = ({ children, className, ...props }) => {
    return (
        <div className={`glass-card rounded-xl shadow-2xl shadow-black/20 ${className}`} {...props}>
            {children}
        </div>
    );
};

export default GlassCard;
