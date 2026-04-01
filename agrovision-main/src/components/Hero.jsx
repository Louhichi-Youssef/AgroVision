import React from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/accc.png'
import { useLanguage } from '../context/LanguageContext'

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="
          max-w-[98%] lg:max-w-[1700px] mx-auto px-6
          min-h-[90vh]
          flex flex-col lg:flex-row
          items-center justify-between
        "
      >
        {/* ================= LEFT CONTENT ================= */}
        <div className="relative z-10 max-w-xl pt-28 lg:pt-0">
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-2
              px-5 py-2 mb-6
              rounded-full
              bg-gradient-to-r from-green-400 to-green-600
              text-white text-sm font-semibold tracking-widest
              shadow-md
            "
          >
            <i className="bx bx-leaf text-lg"></i>
            {t('hero_badge')}
          </div>

          {/* Title */}
          <h1
            className="
              text-4xl sm:text-5xl lg:text-6xl
              font-bold tracking-tight
              text-slate-900 leading-tight
            "
          >
            {t('hero_title')}
            <br />
            <span className="text-green-600">{t('hero_subtitle')}</span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-6 text-base sm:text-lg
              text-slate-500 max-w-lg
              leading-relaxed
            "
          >
            {t('hero_desc')}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/documentation"
              className="
                flex items-center gap-2
                px-6 py-3
                rounded-full
                bg-slate-900 text-white
                text-sm sm:text-base font-semibold
                transition hover:bg-slate-800
              "
            >
              <i className="bx bx-book-open"></i>
              {t('doc')}
            </Link>

            <Link
              to="/contact"
              className="
                flex items-center gap-2
                px-6 py-3
                rounded-full
                bg-green-600 text-white
                text-sm sm:text-base font-semibold
                transition hover:bg-green-500
              "
            >
              <i className="bx bx-envelope"></i>
              {t('contact')}
            </Link>
          </div>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end mt-4 lg:mt-0">

          {/* Image */}
          <img
            src={heroImage}
            alt="AgroVision mobile application"
            className="
              w-full max-w-[480px]
              mb-16
              object-contain
            "
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
