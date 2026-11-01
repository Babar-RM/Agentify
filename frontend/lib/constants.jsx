import React from 'react';
import { Page } from './types.js';
import { DashboardIcon, PlaylistIcon, VideoIcon, ContestIcon, ProfileIcon, BrainCircuitIcon } from '../components/icons/icon.jsx';

export const AGENTIFY_LOGO = (
    <div className="flex items-center gap-2">
        <BrainCircuitIcon className="w-8 h-8 text-neon-cyan" />
        <span className="text-2xl font-bold text-white tracking-wider">Agentify</span>
    </div>
);

export const NAVIGATION_ITEMS = [
  { id: Page.Dashboard, label: Page.Dashboard, icon: <DashboardIcon className="w-5 h-5" /> },
  { id: Page.PremiumPlaylists, label: 'Premium Playlists', icon: <PlaylistIcon className="w-5 h-5" /> },
  { id: Page.VideoLibrary, label: 'Video Library', icon: <VideoIcon className="w-5 h-5" /> },
  { id: Page.ContestHub, label: 'Contest Hub', icon: <ContestIcon className="w-5 h-5" /> },
  { id: Page.Profile, label: 'Profile', icon: <ProfileIcon className="w-5 h-5" /> },
];
