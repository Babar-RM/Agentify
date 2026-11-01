'use client';
import React, { useState } from 'react';
import NeonButton from '../UI/NeonButton';
import { GithubIcon, TrophyIcon } from '../../components/icons/icon.jsx';
const slides = [
    {
       icon: (
            <div className="flex items-center justify-center">
                <img src="/agentifylogo.png" alt="Agentify Logo"  className="h-24 w-24 object-contain" ></img>
            </div>
        ),
        title: "Welcome to Agentify!",
        description: "Your personalized AI coding partner is here. Get ready to transform your problem-solving skills.",
    },
    {
        icon: <GithubIcon className="h-24 w-24 text-white" />,
        title: "AI-Powered Daily Challenges",
        description: "Connect your GitHub, and our advanced AI will analyze your code to deliver the perfect daily problem, personalized to your skill level.",
    },
    {
        icon: <TrophyIcon className="h-24 w-24 text-yellow-400" />,
        title: "Master Skills, Ace Interviews",
        description: "Access premium company playlists, expert video roadmaps, and challenge yourself with contests to land your dream FAANG job.",
    }
];

const OnboardingPage = ({ onFinish }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onFinish();
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <div className="w-full max-w-2xl text-center">
                 <div className="mb-8 animate-fadeIn" key={currentSlide}>
                    {slides[currentSlide].icon}
                </div>
                <h1 className="text-4xl font-bold mb-4 animate-fadeInUp" key={slides[currentSlide].title}>{slides[currentSlide].title}</h1>
                <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto animate-fadeInUp animation-delay-200" key={slides[currentSlide].description}>{slides[currentSlide].description}</p>

                <div className="flex justify-center items-center space-x-3 mb-12">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index ? 'bg-neon-cyan w-6' : 'bg-slate-600'}`}
                        />
                    ))}
                </div>

                <div className="animate-fadeInUp animation-delay-400">
                    <NeonButton onClick={nextSlide} variant="primary" size="lg">
                        {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                    </NeonButton>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
