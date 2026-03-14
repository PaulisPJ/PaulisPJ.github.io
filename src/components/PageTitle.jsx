import React from 'react';

const PageTitle = ({ children, className = '', fontSize = '3rem' }) => {
    return (
        <div
            className={`relative w-full flex justify-center items-center mb-6 text-white ${className}`}
            style={{ aspectRatio: '1599 / 524' }}
        >
            <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.82] drop-shadow-2xl"
                style={{
                    backgroundImage: "url('/images/Title_delis.png')",
                    transform: 'rotate(180deg)'
                }}
            />
            <h2
                className="relative z-10 font-medieval font-bold text-center px-8 pt-2 leading-tight select-none drop-shadow-lg [-webkit-text-stroke:_0.4px_black] [text-shadow:_2px_2px_2px_rgba(0,0,0,0.3)]"
                style={{ fontSize }}
            >
                {children}
            </h2>
        </div>
    );
};

export default PageTitle;
