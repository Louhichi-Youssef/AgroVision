import React from 'react';
import appScreen from '../assets/download.png';
import { useLanguage } from '../context/LanguageContext';

const DownloadApp = () => {
    const { t } = useLanguage();

    const benefits = [
        {
            icon: 'bx-scan',
            title: t('benefit_1_title'),
            desc: t('benefit_1_desc')
        },
        {
            icon: 'bx-cloud-snow',
            title: t('benefit_2_title'),
            desc: t('benefit_2_desc')
        },
        {
            icon: 'bx-support',
            title: t('benefit_3_title'),
            desc: t('benefit_3_desc')
        },
        {
            icon: 'bx-shopping-bag',
            title: t('benefit_4_title'),
            desc: t('benefit_4_desc')
        }
    ];

    return (
        <section id="download" className="w-full py-24 bg-white">
            <div className="max-w-[98%] lg:max-w-[1650px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">

                {/* Content Side */}
                <div className="flex-1 space-y-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold tracking-wide uppercase">
                            <i className='bx bx-mobile-alt'></i>
                            {t('download_badge')}
                        </div>
                        <h2 className="text-[#1e293b] text-4xl md:text-5xl font-bold leading-tight">
                            {t('download_title_part1')} <span className="text-[#1DB954]">AgroVision</span> {t('download_title_part2')}
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            {t('download_desc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-4 group">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-2xl text-[#1DB954] group-hover:bg-[#1DB954] group-hover:text-white transition-all duration-300">
                                    <i className={`bx ${benefit.icon}`}></i>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-[#1e293b]">{benefit.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {/* App Store Button */}
                        <a
                            href="https://apps.apple.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-[#1e293b] text-white px-6 py-3 rounded-2xl hover:bg-[#334155] transition-all duration-300 shadow-xl shadow-slate-200"
                        >
                            <i className='bx bxl-apple text-3xl'></i>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase opacity-60 leading-none">{t('download_available')}</span>
                                <span className="text-lg font-bold leading-tight">App Store</span>
                            </div>
                        </a>

                        {/* Google Play Button */}
                        <a
                            href="https://play.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-[#1e293b] text-white px-6 py-3 rounded-2xl hover:bg-[#334155] transition-all duration-300 shadow-xl shadow-slate-200"
                        >
                            <i className='bx bxl-play-store text-3xl'></i>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase opacity-60 leading-none">{t('download_available')}</span>
                                <span className="text-lg font-bold leading-tight">Google Play</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full max-w-[500px] relative">
                    <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                        <img
                            src={appScreen}
                            alt="AgroVision App Interface"
                            className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] rounded-[3rem]"
                        />
                    </div>

                    {/* Decorative blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-200/30 rounded-full blur-[80px] -z-10"></div>
                </div>

            </div>
        </section>
    );
};

export default DownloadApp;
