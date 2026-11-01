'use client';
import React from 'react';
import NeonButton from '../UI/NeonButton';
import { GithubIcon } from '../icons/icon.jsx';
import { useAppContext } from '../../app/context/AppContext.js';

const MainHeader = () => {
    const { user, logout } = useAppContext();

    return (
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.displayName || user?.email || 'Coder'}!</h1>
            </div>
            <div className="flex space-x-2">
                <NeonButton variant="secondary" size="sm">
                    <GithubIcon className="w-4 h-4 mr-2" /> Manage Repository
                </NeonButton>
                <NeonButton variant="primary" size="sm" onClick={logout}>
                    Logout
                </NeonButton>
            </div>
        </header>
    );
};

export default MainHeader;