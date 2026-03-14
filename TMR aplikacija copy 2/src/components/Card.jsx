import React from 'react';

const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-[var(--color-brand-cream)] rounded-2xl p-6 shadow-lg ${className}`}>
            {children}
        </div>
    );
};

export default Card;
