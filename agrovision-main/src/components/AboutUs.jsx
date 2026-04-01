import React from 'react';
import appScreen from '../assets/app.png';
import { useLanguage } from '../context/LanguageContext';

const AboutUs = () => {
    const { t } = useLanguage();

    return (
        <section className="w-full  bg-white">
            <div className="max-w-[98%] lg:max-w-[1650px] mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12">
                {/* Left Content Column */}
                <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-[#1A1A1A] text-4xl md:text-5xl font-bold tracking-tight">
                            {t('about_badge')}
                        </h2>
                    </div>
                    <br />
                    <div className="space-y-6">
                        <h5 className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                            {t('about_desc')}
                        </h5>
                    </div>
                </div>

                {/* Right Image Column */}
                <div className="flex-1 w-full max-w-2xl">
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-500">
                        <img
                            src={appScreen}
                            alt="AgroVision Intro"
                            className="w-full h-full object-cover"
                        />
                        {/* Subtle overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
