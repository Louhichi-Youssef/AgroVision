import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { lang: currentLang, setLang, t } = useLanguage();
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    const languages = [
        { name: 'Français', code: 'FR', icon: '🇫🇷' },
        { name: 'English', code: 'EN', icon: '🇺🇸' },
        { name: 'العربية', code: 'AR', icon: '🇲🇦' }
    ];

    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu')
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    }

    return (
        <header className="sticky top-0 z-50 flex justify-between 
    items-center py-4 px-4 lg:px-20  backdrop-blur-md shadow-sm transition-all duration-300">
            <Link to="/" className="flex items-center">
                <img src="/agrovision.png" alt="AgroVision Logo" className="h-24 md:h-40 w-auto object-contain hover:scale-105 transition-transform duration-300" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
                <Link className="text-lg font-medium tracking-wide text-gray-700 transition-all duration-300 hover:text-green-600 hover:scale-105" to="/">{t('nav_home')}</Link>
                <Link className="text-lg font-medium tracking-wide text-gray-700 transition-all duration-300 hover:text-green-600 hover:scale-105" to="/meteo">{t('nav_weather')}</Link>
                <Link className="text-lg font-medium tracking-wide text-gray-700 transition-all duration-300 hover:text-green-600 hover:scale-105" to="/scanner">{t('nav_scanner')}</Link>
                <Link className="text-lg font-medium tracking-wide text-gray-700 transition-all duration-300 hover:text-green-600 hover:scale-105" to="/AgroBot">{t('nav_bot')}</Link>
                <Link className="text-lg font-medium tracking-wide text-gray-700 transition-all duration-300 hover:text-green-600 hover:scale-105" to="/marketplace">{t('nav_market')}</Link>
                <a className="text-lg font-medium tracking-wide text-gray-700 transition-all duration-300 hover:text-green-600 hover:scale-105" href="/#download">{t('nav_app')}</a>
                {user?.role === 'admin' && (
                    <Link className="text-lg font-black tracking-wide text-orange-600 transition-all duration-300 hover:text-orange-700 hover:scale-110" to="/admin">ADMIN</Link>
                )}
                <Link
                    className="text-lg font-medium tracking-wide text-gray-700 transition-all duration-300 hover:text-green-600 hover:scale-105"
                    to={user ? "/profile" : "/auth"}
                    state={user ? undefined : { from: "/profile" }}
                >
                    {t('nav_profile')}
                </Link>
            </nav>

            <div className="flex items-center gap-6">
                {/* Language Switcher Desktop */}
                <div className="hidden md:relative md:block text-black">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors"
                    >
                        <i className='bx bx-globe text-xl'></i>
                        <span>{languages.find(l => l.code === currentLang)?.name}</span>
                        <i className={`bx bx-chevron-down transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}></i>
                    </button>

                    {isLangOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLang(lang.code);
                                        setIsLangOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-6 py-4 text-left text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                >
                                    <span>{lang.icon}</span>
                                    <span className="font-medium">{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart Icon in Header */}
                <Link to="/marketplace" className="relative p-2 text-gray-700 hover:text-green-600 transition-colors">
                    <i className='bx bx-shopping-bag text-2xl'></i>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {user ? (
                    <button
                        onClick={logout}
                        className="hidden md:block bg-gradient-to-r from-red-500 to-red-600
                    text-white py-3 px-8 rounded-full border-none shadow-lg shadow-red-500/30
                    font-medium text-lg tracking-wide transition-all duration-300
                    hover:shadow-red-500/50 hover:-translate-y-1 cursor-pointer z-50
                    text-center"
                    >
                        {t('logout')}
                    </button>
                ) : (
                    <Link
                        to="/auth"
                        state={{ from: window.location.pathname }}
                        className="hidden md:block bg-gradient-to-r from-green-500 to-green-600
                    text-white py-3 px-8 rounded-full border-none shadow-lg shadow-green-500/30
                    font-medium text-lg tracking-wide transition-all duration-300
                    hover:shadow-green-500/50 hover:-translate-y-1 cursor-pointer z-50
                    text-center no-underline"
                    >
                        {t('signin')}
                    </Link>
                )}

                {/* Mobile Menu button */}
                <button onClick={toggleMobileMenu} className='md:hidden text-4xl p-2 z-50 text-gray-800'>
                    <i className='bx bx-menu'></i>
                </button>
            </div>

            {/* Mobile Menu */}
            <div id='mobileMenu' className='hidden fixed top-0 bottom-0 right-0 left-0 p-5 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center'>
                <button onClick={toggleMobileMenu} className='absolute top-6 right-6 text-4xl text-white'>
                    <i className='bx bx-x'></i>
                </button>

                <nav className='flex flex-col gap-6 items-center'>
                    <Link className="text-2xl font-light tracking-widest text-white hover:text-green-400 transition-colors" to="/" onClick={toggleMobileMenu}>{t('nav_home')}</Link>
                    <Link className="text-2xl font-light tracking-widest text-white hover:text-green-400 transition-colors" to="/meteo" onClick={toggleMobileMenu}>{t('nav_weather')}</Link>
                    <Link className="text-2xl font-light tracking-widest text-white hover:text-green-400 transition-colors" to="/scanner" onClick={toggleMobileMenu}>{t('nav_scanner')}</Link>
                    <Link className="text-2xl font-light tracking-widest text-white hover:text-green-400 transition-colors" to="/AgroBot" onClick={toggleMobileMenu}>{t('nav_bot')}</Link>
                    <Link className="text-2xl font-light tracking-widest text-white hover:text-green-400 transition-colors" to="/marketplace" onClick={toggleMobileMenu}>{t('nav_market')}</Link>
                    <a className="text-2xl font-light tracking-widest text-white hover:text-green-400 transition-colors" href="/#download" onClick={toggleMobileMenu}>{t('nav_app')}</a>
                    {user?.role === 'admin' && (
                        <Link className="text-2xl font-black tracking-widest text-orange-400 hover:text-orange-300 transition-colors" to="/admin" onClick={toggleMobileMenu}>ADMIN DASHBOARD</Link>
                    )}
                    <Link
                        className="text-2xl font-light tracking-widest text-white hover:text-green-400 transition-colors"
                        to={user ? "/profile" : "/auth"}
                        state={user ? undefined : { from: "/profile" }}
                        onClick={toggleMobileMenu}
                    >
                        {t('nav_profile')}
                    </Link>

                    {/* Language Switcher Mobile */}
                    <div className="mt-4 flex flex-col items-center gap-4 py-4 border-t border-white/10 w-full max-w-[200px]">
                        <p className="text-white/50 text-sm tracking-widest uppercase">Langue</p>
                        <div className="flex gap-6">
                            {languages.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => {
                                        setLang(l.code);
                                        toggleMobileMenu();
                                    }}
                                    className={`text-2xl transition-transform hover:scale-125 ${currentLang === l.code ? 'opacity-100 scale-110' : 'opacity-50'}`}
                                    title={l.name}
                                >
                                    {l.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {user ? (
                        <button
                            onClick={() => {
                                logout();
                                toggleMobileMenu();
                            }}
                            className="mt-6 bg-red-500 text-white py-3 px-10 rounded-full font-bold tracking-widest hover:bg-red-400 transition-colors"
                        >
                            {t('logout')}
                        </button>
                    ) : (
                        <Link
                            to="/auth"
                            state={{ from: window.location.pathname }}
                            onClick={toggleMobileMenu}
                            className="mt-6 bg-green-500 text-white py-3 px-10 rounded-full font-bold tracking-widest hover:bg-green-400 transition-colors"
                        >
                            {t('signin')}
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
