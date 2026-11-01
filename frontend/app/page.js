'use client';

import React, { useEffect } from "react";
import { useAppContext } from "./context/AppContext.js";

// App State Screens
import SplashPage from "../components/Pages/SplashPage.jsx";
import AuthForms from "../components/Auth/AuthForms.jsx";
import OnboardingPage from "../components/Pages/OnboardingPage.jsx";
import MainAppContainer from "../components/Layout/MainAppContainer.jsx";
import GithubIntegrationView from "../components/App/GithubIntegrationView.jsx";

// Landing Page Components
import RegisterForm from "@/components/App/RegisterForm";
import CourseList from "@/components/App/CourseList";
import Dashboard from "@/components/App/Dashboard";


// -------------------------------
// APP FLOW CONTROLLER
// -------------------------------

const AppFlowContent = () => {
  const { appState, setAppState } = useAppContext();

  useEffect(() => {
    if (appState === "splash") {
      const timer = setTimeout(() => setAppState("auth"), 3000);
      return () => clearTimeout(timer);
    }
  }, [appState, setAppState]);

  const renderAppFlow = () => {
    switch (appState) {
      case "splash":
        return <SplashPage />;

      case "auth":
        return (
          <AuthForms
            onLoginSuccess={() => setAppState("onboarding")}
          />
        );

      case "onboarding":
        return (
          <OnboardingPage
            onFinish={() => setAppState("githubSetup")}
          />
        );

      case "githubSetup":
        return (
          <MainAppContainer isGithubSetup={true}>
            <GithubIntegrationView
              onConnected={() => setAppState("main")}
            />
          </MainAppContainer>
        );

      case "main":
        return <MainAppContainer />;

      default:
        return <SplashPage />;
    }
  };

  return <>{renderAppFlow()}</>;
};


// -------------------------------
// LANDING PAGE (MARKETING PAGE)
// -------------------------------

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      {/* HEADER */}
      <header className="pt-12 pb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🤖 Agentify
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            AI-Powered Daily Coding Challenges
          </p>
          <p className="text-gray-600 mt-2">
            Personalized problems • Company courses • Email delivery
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-16">

        {/* DASHBOARD */}
        <Dashboard />

        {/* REGISTER FORM */}
        <section>
          <RegisterForm />
        </section>

        {/* COURSES SECTION */}
        <section>
          <CourseList />
        </section>

        {/* FEATURES */}
        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2">Personalized</h3>
              <p className="text-gray-600 text-sm">
                Problems tailored to your GitHub activity and skill level
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Company Courses</h3>
              <p className="text-gray-600 text-sm">
                30-day structured programs from Google, Amazon, Meta & Microsoft
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold text-lg mb-2">Daily Emails</h3>
              <p className="text-gray-600 text-sm">
                Receive problems directly in your inbox every morning
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600">
        <p>Built with ❤️ by the Agentify Team</p>
      </footer>
    </main>
  );
};


// -------------------------------
// FINAL EXPORT — LOGIC:
// If user is inside the actual app flow → show AppFlowContent
// Else show Landing Page
// -------------------------------

export default function Home() {
  const { appState } = useAppContext();

  // Show Landing Page only when appState is NOT started yet
  if (appState === "landing" || !appState) {
    return <LandingPage />;
  }

  // Else continue app state workflow
  return <AppFlowContent />;
}
