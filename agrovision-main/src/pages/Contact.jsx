import { useState } from 'react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t, lang } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert(t('contact_alert'));
    };

    return (
        <div className={`min-h-screen font-sans bg-white text-gray-800 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
            {/* Header Section with Leaf Background Idea */}
            <div className="relative h-64 w-full bg-green-900 overflow-hidden flex items-center justify-center">
                {/* Placeholder for leaf background image - using gradient for now or external image if available */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-90"></div>
                {/* You would typically use an <img> tag here with object-cover */}
                <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Leaves"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />

                <h1 className="relative z-10 text-5xl font-bold text-white tracking-wide drop-shadow-lg">{t('contact_title')}</h1>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-normal text-center mb-12 text-gray-800">{t('contact_questions')}</h2>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column: Contact Info */}
                    <div className={`space-y-8 flex flex-col justify-center ${lang === 'AR' ? 'md:order-2' : ''}`}>
                        <div className="flex items-center gap-4 text-green-700">
                            <i className='bx bx-phone text-3xl'></i>
                            <span className="text-xl font-medium">503-682-7226</span>
                        </div>

                        <div className="flex items-center gap-4 text-green-700">
                            <i className='bx bx-phone-call text-3xl'></i>
                            <span className="text-xl font-medium">888-5-PLANTX</span>
                        </div>

                        <div className="flex items-center gap-4 text-green-700">
                            <i className='bx bx-envelope text-3xl'></i>
                            <a href="mailto:info@agrovision.net" className="text-xl font-medium hover:underline">info@agrovision.net</a>
                        </div>

                        <div className="flex items-start gap-4 text-gray-700 mt-4">
                            <i className='bx bx-map text-3xl text-gray-500'></i>
                            <div className="text-lg">
                                <p className="font-semibold">{t('contact_mailing')}</p>
                                <p>PO Box 224</p>
                                <p>Tualatin, OR 97062</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className={`bg-white ${lang === 'AR' ? 'md:order-1' : ''}`}>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t('contact_name_placeholder')}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t('contact_email_placeholder')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder={t('contact_subject_placeholder')}
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    placeholder={t('contact_message_placeholder')}
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-center md:justify-start">
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-full border border-green-600 text-green-700 font-medium hover:bg-green-600 hover:text-white transition-all duration-300"
                                >
                                    {t('contact_send')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
