import React from 'react';

const AuthIllustration = () => (
    <div className="hidden lg:flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <div className="w-full max-w-md">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#2dd4bf', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity:1}} />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <path fill="url(#grad1)" d="M44.4,-58.5C57.9,-49.2,69.5,-35.1,75.4,-18.8C81.3,-2.5,81.6,15.9,73.5,30.8C65.4,45.7,48.9,57.1,32.3,64.2C15.7,71.3,-1,74.1,-17.1,70.2C-33.1,66.2,-48.5,55.5,-59.4,41.7C-70.2,27.9,-76.6,11,-75.4,-5.2C-74.2,-21.4,-65.6,-37,-53.1,-46.8C-40.7,-56.6,-24.5,-60.7,-9.4,-61.8C5.7,-62.9,20.8,-60.7,31.5,-62.9C42.2,-65.1,50.9,-71.4,44.4,-58.5Z" transform="translate(100 100)" filter="url(#glow)" opacity="0.3"/>
                <g transform="translate(55 55)" fill="white">
                    <rect x="10" y="30" width="80" height="50" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1"/>
                    <path d="M 20 40 L 35 55 L 50 40" stroke="#34d399" strokeWidth="2" fill="none"/>
                    <path d="M 55 65 L 65 60 L 75 65" stroke="#34d399" strokeWidth="2" fill="none"/>
                </g>
            </svg>
        </div>
        <h2 className="text-3xl font-bold mt-4">Unleash Your Coding Potential</h2>
        <p className="text-gray-300 mt-2 max-w-sm">Get AI-powered daily challenges and ace your interviews.</p>
    </div>
);

export default AuthIllustration;
