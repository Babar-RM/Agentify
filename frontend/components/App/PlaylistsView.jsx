'use client';
import React, { useState } from 'react';
import GlassCard from '../UI/GlassCard';
import NeonButton from '../UI/NeonButton';
import { LockIcon, CheckCircleIcon, CodeIcon, BulbIcon, DocumentTextIcon, CreditCardIcon } from '../../components/icons/icon.jsx';
import MainHeader from '../Layout/MainHeader';

const PlaylistCard = ({ company, title, description, price, progress, onBuyNow }) => (
    <GlassCard className="flex flex-col h-full hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="p-6">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center mr-3 font-bold text-xl glow-shadow-cyan">{company.charAt(0)}</div>
                <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4 h-16">{description}</p>
            {progress ? (
                <div>
                    <div className="flex justify-between text-sm text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{progress.current} / {progress.total}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div className="bg-electric-green h-2.5 rounded-full" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-4 text-slate-400 text-sm">
                    <div className="flex items-center"><CodeIcon className="w-4 h-4 mr-1.5" /> 50 Problems</div>
                    <div className="flex items-center"><DocumentTextIcon className="w-4 h-4 mr-1.5" /> Solutions</div>
                    <div className="flex items-center"><BulbIcon className="w-4 h-4 mr-1.5" /> Hints</div>
                </div>
            )}
        </div>
        <div className="mt-auto p-6 border-t border-slate-700/50 flex justify-between items-center">
            {price && <span className="text-2xl font-bold text-neon-cyan">${price.toFixed(2)}</span>}
            {progress ? (
                <NeonButton variant="secondary"><CheckCircleIcon className="w-5 h-5 mr-2" /> Continue Learning</NeonButton>
            ) : (
                <NeonButton variant="primary" onClick={onBuyNow}><LockIcon className="w-4 h-4 mr-2" /> Buy Now</NeonButton>
            )}
        </div>
    </GlassCard>
);

const PaymentModal = ({onClose}) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <GlassCard className="w-full max-w-md">
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-2">Secure Checkout</h2>
                    <div className="bg-slate-800/50 p-4 rounded-lg mb-6">
                        <p className="text-slate-300">Purchasing: <span className="font-semibold text-white">Meta Top 50 Interview Prep</span></p>
                        <p className="text-2xl font-bold text-neon-cyan mt-2">Total: $4.99</p>
                    </div>
                    <form>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Card Number</label>
                                <div className="relative">
                                    <CreditCardIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input type="text" placeholder="**** **** **** ****" className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-neon-cyan outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                                    <input type="text" placeholder="MM / YY" className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-neon-cyan outline-none" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">CVC</label>
                                    <input type="text" placeholder="***" className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-neon-cyan outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            <NeonButton type="button" variant="secondary" fullWidth onClick={onClose}>Cancel</NeonButton>
                            <NeonButton type="submit" variant="primary" fullWidth>Pay Now $4.99</NeonButton>
                        </div>
                    </form>
                </div>
            </GlassCard>
        </div>
    );
};


const PlaylistsView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}
            <MainHeader />
            <header>
                <h1 className="text-3xl font-bold">Premium Problem Playlists</h1>
                <p className="text-slate-300 mt-1">Unlock exclusive, company-specific problem sets. Prepare smarter, save more.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <PlaylistCard 
                    company="Meta"
                    title="Meta Top 50 Interview Prep"
                    description="Dive into the 50 most frequently asked coding problems at Meta, expertly curated."
                    price={4.99}
                    onBuyNow={() => setIsModalOpen(true)}
                />
                <PlaylistCard 
                    company="Google"
                    title="Google Interview Prep Marathon"
                    description="Master 75 essential problems for Google's rigorous technical interviews."
                    progress={{ current: 10, total: 75 }}
                    onBuyNow={() => {}}
                />
                 <PlaylistCard 
                    company="Amazon"
                    title="Amazon Leadership Principles Coding"
                    description="Tackle problems that align with Amazon's core leadership principles and coding standards."
                    price={9.99}
                    onBuyNow={() => setIsModalOpen(true)}
                />

            </div>
        </div>
    );
};

export default PlaylistsView;
