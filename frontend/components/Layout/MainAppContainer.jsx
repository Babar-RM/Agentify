'use client';
import React from 'react';
import { useAppContext } from '../../app/context/AppContext.js';
import { Page } from '../../lib/types.js';
// Remove .jsx extension
import Sidebar from './Sidebar.jsx';
import DashboardView from '../App/DashboardView.jsx';
import PlaylistsView from '../App/PlaylistsView.jsx';
import VideoLibraryView from '../App/VideoLibraryView.jsx';
import ContestsView from '../App/ContestsView.jsx';
import ProfileView from '../App/ProfileView.jsx';

const MainAppContainer = ({ children, isGithubSetup = false }) => {
  const { currentView } = useAppContext();

  const renderView = () => {
    if (isGithubSetup) return children;

    switch (currentView) {
      case Page.Dashboard:
        return <DashboardView />;
      case Page.PremiumPlaylists:
        return <PlaylistsView />;
      case Page.VideoLibrary:
        return <VideoLibraryView />;
      case Page.ContestHub:
        return <ContestsView />;
      case Page.Profile:
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {!isGithubSetup && <Sidebar />}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
        {renderView()}
      </div>
    </div>
  );
};

export default MainAppContainer;