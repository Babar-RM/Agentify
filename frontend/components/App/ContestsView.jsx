'use client';
import React, { useState, useEffect } from 'react';
import GlassCard from '../UI/GlassCard';
import NeonButton from '../UI/NeonButton';
import MainHeader from '../Layout/MainHeader';

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-12-25T20:00:00") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });
    
    const {d, h, m, s} = timeLeft || {};

    return (
        <div className="text-4xl font-bold text-neon-cyan tracking-wider">
            <span>{String(d || '0').padStart(2, '0')}d </span>
            <span>{String(h || '0').padStart(2, '0')}h </span>
            <span>{String(m || '0').padStart(2, '0')}m </span>
            <span>{String(s || '0').padStart(2, '0')}s</span>
        </div>
    );
};

const TabButton = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${active ? 'bg-slate-800/50 border-b-2 border-neon-cyan text-white' : 'text-slate-400 hover:text-white'}`}>
        {children}
    </button>
)

const ContestsView = () => {
    const [activeTab, setActiveTab] = useState('weekly');

    return (
        <div className="space-y-6">
            <MainHeader />
            <header>
                <h1 className="text-3xl font-bold">Test Your Mettle: Competitions & Quizzes</h1>
            </header>
            
            <div className="border-b border-slate-700">
                <TabButton active={activeTab === 'quizzes'} onClick={() => setActiveTab('quizzes')}>Topic Quizzes</TabButton>
                <TabButton active={activeTab === 'weekly'} onClick={() => setActiveTab('weekly')}>Weekly Contests</TabButton>
                <TabButton active={activeTab === 'special'} onClick={() => setActiveTab('special')}>Special Competitions</TabButton>
            </div>
            
            <div>
                {activeTab === 'quizzes' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                        <GlassCard className="p-6 text-center">
                            <div className="text-4xl font-bold bg-cyan-900/50 text-cyan-300 w-16 h-16 flex items-center justify-center rounded-lg mx-auto mb-4">A</div>
                            <h3 className="text-xl font-bold mb-2">Arrays Fundamentals Quiz</h3>
                            <p className="text-slate-400 mb-4">15 Mins | 10 Questions | 1 Coding Problem</p>
                            <NeonButton variant="secondary">Start Quiz</NeonButton>
                        </GlassCard>
                        <GlassCard className="p-6 text-center">
                            <div className="text-4xl font-bold bg-indigo-900/50 text-indigo-300 w-16 h-16 flex items-center justify-center rounded-lg mx-auto mb-4">DP</div>
                            <h3 className="text-xl font-bold mb-2">Dynamic Programming Basics</h3>
                            <p className="text-slate-400 mb-4">20 Mins | 8 Questions | 2 Problems</p>
                            <NeonButton variant="secondary">Start Quiz</NeonButton>
                        </GlassCard>
                    </div>
                )}
                {activeTab === 'weekly' && (
                    <div className="animate-fadeIn">
                        <GlassCard className="p-8 text-center bg-gradient-to-br from-slate-800/50 to-indigo-900/40">
                            <h2 className="text-3xl font-bold mb-2">Weekly Contest #8: The Data Structure Challenge</h2>
                            <p className="text-slate-300 mb-4">Starts in:</p>
                            <CountdownTimer />
                            <p className="text-slate-300 my-4">Solve 3 problems in 90 minutes. Top 10% get a certificate.</p>
                            <NeonButton variant="primary" size="lg">Register Now</NeonButton>
                        </GlassCard>
                        <div className="mt-6">
                            <h3 className="text-xl font-bold mb-3">Past Contests</h3>
                            <GlassCard className="p-4">
                                <ul>
                                    <li className="flex justify-between items-center p-3 hover:bg-slate-800/50 rounded-lg">
                                        <span>Contest #7 (Nov 10, 2025)</span>
                                        <div className="flex space-x-2">
                                            <NeonButton size="sm" variant="secondary">View Problems</NeonButton>
                                            <NeonButton size="sm" variant="secondary">Leaderboard</NeonButton>
                                        </div>
                                    </li>
                                </ul>
                            </GlassCard>
                        </div>
                    </div>
                )}
                {activeTab === 'special' && (
                     <div className="animate-fadeIn">
                        <GlassCard className="p-8 text-center bg-cover bg-center" style={{backgroundImage: 'linear-gradient(rgba(10,9,24,0.8), rgba(10,9,24,0.8)), url(https://picsum.photos/seed/contest/1200/400)'}}>
                            <h2 className="text-4xl font-bold text-yellow-300 mb-4">The Agentify FAANG-Ready Challenge!</h2>
                            <p className="text-slate-200 text-lg mb-6">Dates: Nov 20th - Nov 25th | Grand Prize: Mentorship Session + Elite Certificate</p>
                            <NeonButton className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" size="lg">Join Competition</NeonButton>
                        </GlassCard>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestsView;
