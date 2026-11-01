'use client';
import React, { useState } from 'react';
import GlassCard from '../UI/GlassCard';
import NeonButton from '../UI/NeonButton';
import MainHeader from '../Layout/MainHeader';

const TabButton = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 font-medium rounded-md transition-colors text-sm sm:text-base ${active ? 'bg-cyan-500/20 text-neon-cyan' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'}`}>
        {children}
    </button>
)

const ProfileView = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="space-y-6">
            <MainHeader />
            <header>
                <h1 className="text-3xl font-bold">Your Account Settings</h1>
            </header>
            
            <div className="flex flex-wrap space-x-1 sm:space-x-2 border-b border-slate-700 pb-2">
                <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>Profile</TabButton>
                <TabButton active={activeTab === 'account'} onClick={() => setActiveTab('account')}>Account</TabButton>
                <TabButton active={activeTab === 'billing'} onClick={() => setActiveTab('billing')}>Billing</TabButton>
                <TabButton active={activeTab === 'discount'} onClick={() => setActiveTab('discount')}>CGPA Discount</TabButton>
                <TabButton active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')}>My Certificates</TabButton>
            </div>
            
            <GlassCard>
                <div className="p-8 animate-fadeIn">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 max-w-lg">
                           <h2 className="text-xl font-bold">Profile</h2>
                           <div className="flex items-center space-x-6">
                               <img src="https://picsum.photos/seed/user/128/128" alt="User avatar" className="w-24 h-24 rounded-full border-2 border-neon-cyan" />
                               <NeonButton variant="secondary">Upload new picture</NeonButton>
                           </div>
                           <div>
                               <label className="text-sm font-medium mb-1 block">Full Name</label>
                               <input type="text" value="Alex Doe" readOnly className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"/>
                           </div>
                           <div>
                               <label className="text-sm font-medium mb-1 block">Email Address</label>
                               <input type="email" value="alex.doe@example.com" readOnly className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 cursor-not-allowed"/>
                           </div>
                           <NeonButton variant="primary" disabled>Save Changes</NeonButton>
                        </div>
                    )}
                     {activeTab === 'account' && (
                        <div className="space-y-6 max-w-lg">
                           <h2 className="text-xl font-bold">Account</h2>
                           <div>
                               <h3 className="font-semibold mb-2">GitHub Integration</h3>
                               <p className="text-slate-300 mb-2">github.com/alex/my-code</p>
                               <div className="flex space-x-2">
                                   <NeonButton variant="secondary" size="sm">Sync Now</NeonButton>
                                   <NeonButton variant="primary" size="sm">Change Repository</NeonButton>
                               </div>
                           </div>
                           <hr className="border-slate-700" />
                           <div>
                               <label className="text-sm font-medium mb-1 block">Daily Problem Email Time</label>
                               <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-neon-cyan outline-none">
                                   <option>7:00 AM</option>
                                   <option>8:00 AM</option>
                                   <option>9:00 AM</option>
                               </select>
                           </div>
                           <div>
                               <label className="text-sm font-medium mb-1 block">Password</label>
                               <NeonButton variant="secondary">Change Password</NeonButton>
                           </div>
                        </div>
                    )}
                    {activeTab === 'certificates' && (
                         <div className="space-y-6">
                            <h2 className="text-xl font-bold">Your Earned Achievements</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <GlassCard className="p-4 bg-slate-800/50">
                                    <h4 className="font-bold">Arrays Expert Quiz Completion</h4>
                                    <p className="text-sm text-slate-400 mb-3">Earned: Nov 14, 2025</p>
                                    <div className="flex space-x-2">
                                        <NeonButton size="sm" variant="secondary">Download PDF</NeonButton>
                                        <NeonButton size="sm" variant="secondary">Share to LinkedIn</NeonButton>
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
};

export default ProfileView;
