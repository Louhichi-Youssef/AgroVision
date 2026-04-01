import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Weather = () => {
    const { t, lang } = useLanguage();
    const [city, setCity] = useState('Marrakech');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const fetchWeather = async (cityName) => {
        setLoading(true);
        setError(null);
        try {
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=fr&format=json`);
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('Ville non trouvée');
            }

            const { latitude, longitude, name, country } = geoData.results[0];
            setCity(`${name}, ${country}`);

            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum&timezone=auto`);
            const weatherData = await weatherRes.json();

            setWeather(weatherData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            fetchWeather(searchInput);
        }
    };

    const getWeatherIcon = (code) => {
        if (code === 0) return 'bx-sun text-yellow-400';
        if (code <= 3) return 'bx-cloud text-gray-400';
        if (code <= 48) return 'bx-cloud-fog text-gray-300';
        if (code <= 67) return 'bx-cloud-rain text-blue-400';
        if (code <= 77) return 'bx-cloud-snow text-slate-200';
        if (code <= 82) return 'bx-cloud-showers-heavy text-blue-600';
        return 'bx-cloud-lightning text-yellow-600';
    };

    const getAgriAdvice = () => {
        if (!weather) return "";
        const speed = weather.current.wind_speed_10m;
        const hum = weather.current.relative_humidity_2m;
        const temp = weather.current.temperature_2m;

        if (speed > 15) return t('advice_wind');
        if (hum > 80) return t('advice_hum');
        if (temp > 30) return t('advice_heat');
        if (temp < 5) return t('advice_frost');
        return t('advice_optimal');
    };

    return (
        <div className="pt-32 min-h-screen px-6 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className={lang === 'AR' ? 'text-right' : 'text-left'}>
                    <h1 className="text-4xl font-bold text-[#1e293b]">{t('weather_title')}</h1>
                    <p className="text-slate-500 mt-2 flex items-center gap-2">
                        <i className='bx bx-map-pin text-[#1DB954]'></i>
                        {loading ? t('weather_searching') : city}
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder={t('weather_search')}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 shadow-lg shadow-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all"
                    />
                    <i className='bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400'></i>
                </form>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl mb-8 flex items-center gap-4">
                    <i className='bx bx-error-circle text-2xl'></i>
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-medium tracking-wide">{t('weather_updating')}</p>
                </div>
            ) : weather && (
                <div className="space-y-10 animate-fade-in">
                    {/* Main Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Temperature */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-50 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                                <i className={`bx ${getWeatherIcon(weather.current.weather_code)} text-4xl`}></i>
                            </div>
                            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">{t('weather_temp')}</h3>
                            <p className="text-5xl font-bold text-[#1e293b] my-3">{Math.round(weather.current.temperature_2m)}°C</p>
                            <p className="text-slate-500 text-sm font-medium">{t('weather_feel')} {Math.round(weather.current.apparent_temperature)}°C</p>
                        </div>

                        {/* Humidity */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-50 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                                <i className='bx bx-droplet text-blue-500 text-4xl'></i>
                            </div>
                            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">{t('weather_hum')}</h3>
                            <p className="text-5xl font-bold text-[#1e293b] my-3">{weather.current.relative_humidity_2m}%</p>
                            <p className="text-slate-500 text-sm font-medium">{t('weather_hum_opt')}</p>
                        </div>

                        {/* Wind */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-50 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                                <i className='bx bx-wind text-slate-500 text-4xl'></i>
                            </div>
                            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">{t('weather_wind')}</h3>
                            <p className="text-5xl font-bold text-[#1e293b] my-3">{Math.round(weather.current.wind_speed_10m)} <span className="text-lg font-medium">km/h</span></p>
                            <p className="text-slate-500 text-sm font-medium">{t('weather_wind_dir')}</p>
                        </div>

                        {/* UV Index */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-50 flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-4">
                                <i className='bx bx-sun text-yellow-500 text-4xl'></i>
                            </div>
                            <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">{t('weather_uv')}</h3>
                            <p className="text-5xl font-bold text-[#1e293b] my-3">{Math.round(weather.daily.uv_index_max[0])}</p>
                            <p className="text-slate-500 text-sm font-medium">{t('weather_uv_max')}</p>
                        </div>
                    </div>

                    {/* Agri Advice Section */}
                    <div className="bg-[#1e293b] p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <i className='bx bx-leaf text-9xl'></i>
                        </div>
                        <div className={`z-10 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                                <i className='bx bx-bot'></i>
                                {t('weather_agribot_intel')}
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{t('weather_advice_title')}</h3>
                            <p className="text-slate-300 text-xl leading-relaxed max-w-3xl">
                                "{getAgriAdvice()}"
                            </p>
                        </div>
                        <button className="z-10 bg-[#1DB954] hover:bg-[#17a34a] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-green-500/20 whitespace-nowrap">
                            {t('weather_plan_btn')}
                        </button>
                    </div>

                    {/* Forecast Table Preview */}
                    <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-50">
                        <h3 className={`text-2xl font-bold text-[#1e293b] mb-8 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>{t('weather_forecast_7')}</h3>
                        <div className="overflow-x-auto">
                            <div className="flex gap-6 min-w-max pb-4">
                                {weather.daily.time.map((date, i) => (
                                    <div key={i} className="flex flex-col items-center p-6 bg-slate-50 rounded-[2rem] min-w-[120px]">
                                        <span className="text-slate-500 font-bold text-sm mb-3">
                                            {i === 0 ? t('weather_today') : new Date(date).toLocaleDateString(lang === 'FR' ? 'fr-FR' : lang === 'AR' ? 'ar-MA' : 'en-US', { weekday: 'short' })}
                                        </span>
                                        <i className={`bx ${getWeatherIcon(weather.daily.weather_code[i])} text-3xl mb-3`}></i>
                                        <span className="text-[#1e293b] font-bold text-lg">{Math.round(weather.daily.temperature_2m_max[i])}°</span>
                                        <span className="text-slate-400 text-sm">{Math.round(weather.daily.temperature_2m_min[i])}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
