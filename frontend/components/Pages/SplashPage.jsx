import React from 'react';
import LoadingDots from '../UI/LoadingDots';

const SplashPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full animate-fadeIn">
            <div className="relative mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-electric-green rounded-2xl blur-lg opacity-75"></div>
                <div className="relative p-4 bg-gray-900 border border-cyan-500/50 rounded-2xl shadow-2xl">
                    {/* Replace with your logo */}
                    <img 
                        src="/agentifylogo.png" 
                        alt="Agentify Logo" 
                        className="h-24 w-24 object-contain"
                    />
                </div>
            </div>
            <h1 className="text-5xl font-bold text-white tracking-wider my-4" style={{textShadow: '0 0 10px rgba(45, 212, 191, 0.7)'}}>Agentify</h1>
            <p className="text-gray-300 text-lg mb-8">Your AI coding partner – one problem a day, smarter every way.</p>
            <LoadingDots />
        </div>
    );
};

export default SplashPage;