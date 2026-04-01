import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager, Platform } from 'react-native';

import en from './translations/en.json';
import fr from './translations/fr.json';
import ar from './translations/ar.json';

const resources = {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
};

const initI18n = async () => {
    let savedLanguage = 'en';

    if (Platform.OS !== 'web' || typeof window !== 'undefined') {
        try {
            const stored = await AsyncStorage.getItem('user-language');
            if (stored) savedLanguage = stored;
            else {
                const locales = Localization.getLocales();
                if (locales && locales.length > 0) {
                    savedLanguage = locales[0].languageCode || 'en';
                }
            }
        } catch (e) {
            console.warn('i18n initialization error:', e);
        }
    }

    i18n.changeLanguage(savedLanguage);

    // Handle RTL for Arabic
    const isRTL = savedLanguage === 'ar';
    if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
    }
};

// Only initialize if we're not in a purely Node environment (like SSR during build)
// or handled safely by i18next itself
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default, will be updated by initI18n
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

if (Platform.OS !== 'web' || typeof window !== 'undefined') {
    initI18n().then(() => {
        if (i18n.language !== 'en') {
            // i18n.changeLanguage is handled inside initI18n by re-init or explicit call
        }
    });
}

export default i18n;
