import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AuthGateway = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={`min-h-screen w-full bg-gradient-to-br from-green-50 to-white relative overflow-hidden flex flex-col items-center justify-center py-20 ${lang === 'AR' ? 'rtl' : 'ltr'}`}>

            {/* Back to Home Arrow */}
            <Link
                to="/"
                className="absolute top-8 left-8 p-3 rounded-full hover:bg-white/50 transition-all duration-300 z-50 group"
                title={t('auth_return_home')}
            >
                <i className='bx bx-left-arrow-alt text-4xl text-slate-700 group-hover:text-green-600 transition-colors transform group-hover:-translate-x-1'></i>
            </Link>

            {/* Background Decorative Glows */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-green-100 rounded-full blur-[120px] pointer-events-none opacity-50 animate-pulse-slow"></div>
            <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[100px] pointer-events-none opacity-60"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="waves" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                            <path d="M0 60 Q 30 30 60 60 T 120 60" fill="none" stroke="#22c55e" strokeWidth="1" />
                            <path d="M0 80 Q 30 50 60 80 T 120 80" fill="none" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#waves)" />
                </svg>
            </div>

            {/* Logo Area */}
            <div className="mb-8 flex flex-col items-center animate-fade-in-down relative z-10 w-full px-4">
                <div className="w-32 h-32 mb-6 bg-white p-6 rounded-[2rem] shadow-xl shadow-green-100 transform hover:scale-105 transition-transform duration-500">
                    <img src="/agrovision.png" alt="AgroVision Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-extrabold text-slate-800 tracking-[0.4em] uppercase opacity-70">AgroVision</span>
            </div>

            {/* Typography Heading */}
            <div className="text-center mb-12 animate-fade-in relative z-10 px-2 w-full max-w-full">
                <h1 className="text-3xl md:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-[1.2] mb-2 drop-shadow-sm">
                    "{t('gateway_h1')}"
                </h1>
                <h2 className="text-xl md:text-3xl font-sans font-medium text-slate-500 tracking-tight leading-[1.2]">
                    {t('gateway_h2')}
                </h2>
            </div>

            {/* Buttons Container */}
            <div className="w-full max-w-[450px] space-y-4 animate-fade-in-up px-6 relative z-10">
                {/* Sign Up - Solid Green */}
                <button
                    onClick={() => navigate('/signup', { state: location.state })}
                    className="w-full py-5 bg-[#1DB954] hover:bg-[#1aa34a] text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 text-sm tracking-widest uppercase flex items-center justify-center gap-2 group"
                >
                    {t('gateway_signup')}
                </button>

                {/* Sign In - Outlined */}
                <button
                    onClick={() => navigate('/signin', { state: location.state })}
                    className="w-full py-5 bg-white border-2 border-slate-100 text-slate-800 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md text-sm tracking-widest uppercase"
                >
                    {t('gateway_signin')}
                </button>

                <div className="flex gap-4 pt-2">
                    {/* Continue with Google */}
                    <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
                        <i className='bx bxl-google text-xl'></i>
                        Google
                    </button>

                    {/* Continue with Facebook */}
                    <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
                        <i className='bx bxl-facebook text-xl text-blue-600'></i>
                        Facebook
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 text-slate-400/60 text-[10px] font-medium uppercase tracking-widest">
                © 2026 AgroVision.
            </div>
        </div>
    );
};

export default AuthGateway;
