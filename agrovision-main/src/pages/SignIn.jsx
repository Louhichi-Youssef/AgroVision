import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import 'boxicons/css/boxicons.min.css'
import { useLanguage } from '../context/LanguageContext'

const SignIn = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/'
    const { t, lang } = useLanguage()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [focused, setFocused] = useState({
        email: false,
        password: false
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFocus = (field) => {
        setFocused({ ...focused, [field]: true })
    }

    const handleBlur = (field) => {
        if (!formData[field]) {
            setFocused({ ...focused, [field]: false })
        }
    }

    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (response.ok) {
                login(data.user, data.token)
                if (data.user.role === 'admin') {
                    navigate('/admin', { replace: true })
                } else {
                    navigate(from, { replace: true })
                }
            } else {
                setError(data.message || 'Login failed')
            }
        } catch (err) {
            setError('Server connection failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden ${lang === 'AR' ? 'rtl' : 'ltr'}`}>
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-100/50 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]"></div>

            <div className={`relative z-10 w-full max-w-[1100px] flex flex-col md:flex-row bg-white rounded-[40px] shadow-2xl overflow-hidden min-h-[650px] mx-4 animate-fade-in ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#006837] to-[#1DB954] p-12 flex-col justify-between relative overflow-hidden">
                    <div className={`relative z-10 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                        <div className={`flex items-center gap-2 mb-12 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                            <i className='bx bxs-leaf text-4xl text-white'></i>
                            <span className="text-white text-2xl font-bold tracking-tight">AgroVision</span>
                        </div>
                        <h2 className="text-5xl font-bold text-white leading-tight mb-6">
                            {t('auth_back_title')}
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed">
                            {t('auth_back_desc')}
                        </p>
                    </div>

                    <div className={`relative z-10 flex items-center gap-4 text-white/60 text-sm ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                        <span>© 2026 AgroVision Inc.</span>
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        <span>Privacy Policy</span>
                    </div>

                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] border-[40px] border-white/5 rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">
                        <div className={`mb-10 text-center ${lang === 'AR' ? 'md:text-right' : 'md:text-left'}`}>
                            <h1 className="text-4xl font-bold text-[#1e293b] mb-3">{t('auth_welcome')}</h1>
                            <p className="text-slate-500">{t('auth_subtitle')}</p>
                            {error && <div className="mt-4 p-4 bg-red-50 text-red-500 text-sm font-bold rounded-2xl border border-red-100">{error}</div>}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold text-slate-700 ${lang === 'AR' ? 'mr-1' : 'ml-1'}`}>{t('auth_email')}</label>
                                <div className="relative group">
                                    <i className={`bx bx-envelope absolute ${lang === 'AR' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-xl transition-colors duration-300 ${focused.email ? 'text-[#1DB954]' : 'text-slate-400'}`}></i>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('email')}
                                        onBlur={() => handleBlur('email')}
                                        required
                                        className={`w-full ${lang === 'AR' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#1DB954] transition-all duration-300 text-slate-700`}
                                        placeholder={t('auth_email_placeholder')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold text-slate-700 ${lang === 'AR' ? 'mr-1' : 'ml-1'}`}>{t('auth_pwd')}</label>
                                <div className="relative group">
                                    <i className={`bx bx-lock-alt absolute ${lang === 'AR' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-xl transition-colors duration-300 ${focused.password ? 'text-[#1DB954]' : 'text-slate-400'}`}></i>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('password')}
                                        onBlur={() => handleBlur('password')}
                                        required
                                        className={`w-full ${lang === 'AR' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#1DB954] transition-all duration-300 text-slate-700`}
                                        placeholder={t('auth_pwd_placeholder')}
                                    />
                                </div>
                            </div>

                            <div className={`flex items-center justify-between ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                <label className={`flex items-center gap-2 cursor-pointer group ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#1DB954] focus:ring-[#1DB954]" />
                                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{t('auth_remember')}</span>
                                </label>
                                <a href="#" className="text-sm font-semibold text-[#1DB954] hover:text-[#17a34a] transition-colors">{t('auth_forgot')}</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-[#1e293b] text-white font-bold rounded-2xl hover:bg-[#334155] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-slate-200"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                ) : t('auth_login_btn')}
                            </button>
                        </form>

                        <div className="mt-10 text-center">
                            <p className="text-slate-500">
                                {t('auth_new_here')}{' '}
                                <Link to="/signup" className="text-[#1DB954] font-bold hover:underline">
                                    {t('auth_create_acc')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/" className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-[#1DB954] transition-colors flex items-center gap-2 font-medium ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                <i className={`bx ${lang === 'AR' ? 'bx-arrow-back rotate-180' : 'bx-arrow-back'}`}></i>
                {t('auth_return_home')}
            </Link>
        </div>
    )
}

export default SignIn
