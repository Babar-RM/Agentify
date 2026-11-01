'use client';
import React from 'react';
import { PlayIcon } from '../../components/icons/icon.jsx';
import MainHeader from '../Layout/MainHeader';

const VideoCard = ({ title, author, duration, imageUrl, progress }) => (
    <div className="flex-shrink-0 w-72 group relative">
        <div className="relative overflow-hidden rounded-lg">
            <img src={imageUrl} alt={title} className="aspect-video object-cover w-full transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <PlayIcon className="w-8 h-8 text-white" />
                </div>
            </div>
             {progress && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700/50">
                    <div className="bg-neon-cyan h-1" style={{ width: `${progress}%` }}></div>
                </div>
            )}
        </div>
        <div className="mt-2">
            <h4 className="font-semibold truncate text-white">{title}</h4>
            <div className="flex justify-between text-sm text-slate-400">
                <span>{author}</span>
                <span>{duration}</span>
            </div>
        </div>
    </div>
);

const VideoRow = ({ title, videos }) => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-4 pb-4 overflow-x-auto">
            {videos.map((video, index) => (
                <VideoCard key={index} {...video} imageUrl={`https://picsum.photos/seed/${title.replace(/\s/g, '')}${index}/400/225`} />
            ))}
        </div>
    </div>
);

const VideoLibraryView = () => {
    const faangRoadmaps = [
        { title: "How to Crack the System Design Interview", author: "Dr. Zafar Shahid", duration: "1h 25m", progress: 75 },
        { title: "Mastering Big O Notation", author: "Jane Doe", duration: "45m" },
        { title: "Google's Top 10 Algo Questions", author: "Alex Smith", duration: "2h 10m", progress: 20 },
        { title: "Meta Behavioral Interview Prep", author: "Dr. Zafar Shahid", duration: "55m" },
    ];

    const problemSolving = [
        { title: "Dynamic Programming from Scratch", author: "John Code", duration: "3h 05m" },
        { title: "Advanced Graph Algorithms", author: "Emily White", duration: "2h 45m" },
        { title: "Two Pointers Technique", author: "Jane Doe", duration: "1h 15m", progress: 100 },
        { title: "Sliding Window Explained", author: "Alex Smith", duration: "1h 30m" },
    ];

    return (
        <div className="space-y-8">
            <MainHeader />
            <header>
                <h1 className="text-3xl font-bold">Expert Roadmaps & Sessions</h1>
            </header>
            
            <VideoRow title="FAANG Interview Roadmaps" videos={faangRoadmaps} />
            <VideoRow title="Problem Solving Techniques" videos={problemSolving} />
        </div>
    );
};

export default VideoLibraryView;
