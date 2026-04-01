import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#1a1a1a] text-white py-10 px-6 mt-16 border-t border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-green-500 mb-4">AgroVision</h2>
                    <p className="text-gray-400">
                        {t('footer_desc')}
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">{t('footer_links')}</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="text-gray-400 hover:text-green-500 transition-colors">{t('nav_home')}</Link>
                        </li>
                        <li>
                            <Link to="/documentation" className="text-gray-400 hover:text-green-500 transition-colors">{t('doc')}</Link>
                        </li>
                        <li>
                            <Link to="/marketplace" className="text-gray-400 hover:text-green-500 transition-colors">{t('nav_market')}</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">{t('footer_contact')}</h3>
                    <p className="text-gray-400 mb-2">{t('footer_help')}</p>
                    <p className="text-green-500 font-medium mb-4">info@agrovision.net</p>
                    <div className="flex gap-4">
                        <i className='bx bxl-facebook text-2xl hover:text-green-500 cursor-pointer'></i>
                        <i className='bx bxl-twitter text-2xl hover:text-green-500 cursor-pointer'></i>
                        <i className='bx bxl-instagram text-2xl hover:text-green-500 cursor-pointer'></i>
                    </div>
                </div>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500">
                &copy; {new Date().getFullYear()} AgroVision. {t('footer_rights')}
            </div>
        </footer>
    );
};

export default Footer;
