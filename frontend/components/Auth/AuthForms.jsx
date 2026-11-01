'use client';
import React, { useState } from 'react';
import { 
  GithubIcon, 
  GoogleIcon, 
  LockIcon, 
  MailIcon, 
  UserIcon, 
  EyeIcon, 
  EyeOffIcon, 
  ArrowLeftIcon 
} from '../icons/icon.jsx';
import NeonButton from '../UI/NeonButton';
import GlassCard from '../UI/GlassCard';
import AuthIllustration from './AuthIllustration';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../../lib/firebase.js';

const InputField = ({ icon, type = "text", placeholder, value, onChange, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">{icon}</span>
            <input 
                type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan outline-none transition-all"
                {...props}
            />
            {isPassword && (
                <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-neon-cyan">
                    {isPasswordVisible ? <EyeOffIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                </button>
            )}
        </div>
    );
};

const SocialButtons = ({ action, onGoogleAuth, onGithubAuth }) => (
    <>
        <NeonButton type="button" fullWidth variant="primary" onClick={onGithubAuth} className="mb-4">
            <GithubIcon className="w-5 h-5 mr-2" /> {action} with GitHub
        </NeonButton>
        <NeonButton type="button" fullWidth variant="secondary" onClick={onGoogleAuth}>
            <GoogleIcon className="w-5 h-5 mr-2" /> {action} with Google
        </NeonButton>
        <div className="flex items-center my-6">
            <hr className="w-full border-slate-600" />
            <span className="px-3 text-slate-400 text-sm">OR</span>
            <hr className="w-full border-slate-600" />
        </div>
    </>
);

const SignUpForm = ({ onSignInClick, onSignUpSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            onSignUpSuccess();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onSignUpSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGithubAuth = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            onSignUpSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <GlassCard className="w-full max-w-md animate-fadeIn">
            <div className="p-8">
                <h2 className="text-3xl font-bold text-center mb-1">Create Account</h2>
                <div className="flex justify-center space-x-4 my-4">
                    <button className="py-2 text-white font-semibold border-b-2 border-neon-cyan">Sign Up</button>
                    <button onClick={onSignInClick} className="py-2 text-slate-400 font-semibold hover:text-white transition">Sign In</button>
                </div>
                
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <SocialButtons action="Sign up" onGoogleAuth={handleGoogleAuth} onGithubAuth={handleGithubAuth}/>
                    
                    <InputField 
                        icon={<UserIcon className="w-5 h-5" />} 
                        placeholder="Full Name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <InputField 
                        icon={<MailIcon className="w-5 h-5" />} 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputField 
                        icon={<LockIcon className="w-5 h-5" />} 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <InputField 
                        icon={<LockIcon className="w-5 h-5" />} 
                        type="password" 
                        placeholder="Confirm Password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    
                    <NeonButton type="submit" fullWidth variant="primary" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </NeonButton>
                </form>
                
                <p className="text-sm text-center text-slate-400 mt-6">
                    Already have an account? <button onClick={onSignInClick} className="font-semibold text-neon-cyan hover:underline">Sign In</button>
                </p>
            </div>
        </GlassCard>
    );
};

const SignInForm = ({ onSignUpClick, onForgotPasswordClick, onLoginSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            onLoginSuccess();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onLoginSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGithubAuth = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            onLoginSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <GlassCard className="w-full max-w-md animate-fadeIn">
            <div className="p-8">
                <h2 className="text-3xl font-bold text-center mb-1">Welcome Back</h2>
                <div className="flex justify-center space-x-4 my-4">
                    <button onClick={onSignUpClick} className="py-2 text-slate-400 font-semibold hover:text-white transition">Sign Up</button>
                    <button className="py-2 text-white font-semibold border-b-2 border-neon-cyan">Sign In</button>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <SocialButtons action="Sign in" onGoogleAuth={handleGoogleAuth} onGithubAuth={handleGithubAuth} />
                    
                    <InputField 
                        icon={<MailIcon className="w-5 h-5" />} 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputField 
                        icon={<LockIcon className="w-5 h-5" />} 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <div className="text-right">
                        <button type="button" onClick={onForgotPasswordClick} className="text-sm font-semibold text-neon-cyan hover:underline">Forgot Password?</button>
                    </div>
                    
                    <NeonButton type="submit" fullWidth variant="primary" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </NeonButton>
                </form>
                
                <p className="text-sm text-center text-slate-400 mt-6">
                    Don&apos;t have an account? <button onClick={onSignUpClick} className="font-semibold text-neon-cyan hover:underline">Sign Up</button>
                </p>
            </div>
        </GlassCard>
    );
};

const ForgotPasswordForm = ({ onBackToSignInClick }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassCard className="w-full max-w-md animate-fadeIn">
            <div className="p-8">
                <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
                <p className="text-slate-300 text-center mb-6">Enter your email, and we&apos;ll send you a link to get back into your account.</p>
                
                {message && (
                    <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 text-sm">
                        {message}
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField 
                        icon={<MailIcon className="w-5 h-5" />} 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <NeonButton type="submit" fullWidth variant="primary" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </NeonButton>
                </form>
                
                <button onClick={onBackToSignInClick} className="flex items-center justify-center w-full text-sm text-neon-cyan font-semibold mt-6 hover:underline">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Sign In
                </button>
            </div>
        </GlassCard>
    );
};

const AuthForms = ({ onLoginSuccess }) => {
    const [mode, setMode] = useState('signUp'); // 'signIn', 'signUp', 'forgotPassword'

    const renderForm = () => {
        switch (mode) {
            case 'signIn':
                return <SignInForm onSignUpClick={() => setMode('signUp')} onForgotPasswordClick={() => setMode('forgotPassword')} onLoginSuccess={onLoginSuccess} />;
            case 'signUp':
                return <SignUpForm onSignInClick={() => setMode('signIn')} onSignUpSuccess={onLoginSuccess} />;
            case 'forgotPassword':
                return <ForgotPasswordForm onBackToSignInClick={() => setMode('signIn')} />;
            default:
                return <SignUpForm onSignInClick={() => setMode('signIn')} onSignUpSuccess={onLoginSuccess} />;
        }
    }

    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
                <AuthIllustration />
                <div className="flex items-center justify-center">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default AuthForms;