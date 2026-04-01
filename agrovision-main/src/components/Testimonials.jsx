import React, { useState } from 'react'
import bgImage from '../assets/testimonial_bg.png'
import { useLanguage } from '../context/LanguageContext'

const Testimonials = () => {
    const { t } = useLanguage()
    const testimonials = t('testimonials') || []
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        if (testimonials.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        if (testimonials.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden my-20">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${bgImage})`, filter: 'brightness(0.5)' }}
            >
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl px-4 flex items-center justify-between text-white pb-10">

                {/* Left Arrow */}
                <button
                    onClick={prevTestimonial}
                    className="text-4xl md:text-6xl text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                    <i className='bx bx-chevron-left'></i>
                </button>

                {/* Quote Content */}
                <div key={currentIndex} className="flex-1 text-center animate-fade-in px-4 md:px-12">
                    <p className="text-xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-6">
                        "{testimonials[currentIndex]?.text}"
                    </p>
                    <p className="text-sm md:text-lg font-medium tracking-wide text-gray-200">
                        - {testimonials[currentIndex]?.author}, {testimonials[currentIndex]?.company}
                    </p>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextTestimonial}
                    className="text-4xl md:text-6xl text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                    <i className='bx bx-chevron-right'></i>
                </button>

            </div>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${currentIndex === idx ? 'bg-white scale-110' : 'bg-transparent opacity-50 hover:opacity-100'
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default Testimonials
