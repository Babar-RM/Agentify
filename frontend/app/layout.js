import './globals.css';
import { AppProvider } from './context/AppContext.js';

export const metadata = {
  title: 'Agentify - Your AI Coding Partner',
  description: 'AI-powered platform to help students and engineers master coding problems.',
};

const DynamicBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-rich-purple to-deep-blue"></div>
        <div 
            className="absolute top-0 left-0 w-full h-full bg-repeat"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(45, 212, 191, 0.1) 0%, transparent 30%),
                    radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 30%)
                `
            }}
        />
        <div 
            className="absolute top-0 left-0 w-full h-full bg-repeat opacity-40"
            style={{
                backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%232dd4bf" fill-opacity="0.1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>\')'
            }}
        />
    </div>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="relative min-h-screen w-full">
            <DynamicBackground />
            <main className="relative z-10 h-screen w-screen">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}