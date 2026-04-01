import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    FR: {
        // Navigation
        nav_home: "Accueil",
        nav_weather: "Météo",
        nav_scanner: "Scanner plante",
        nav_bot: "AgroBot",
        nav_market: "Marketplace",
        nav_app: "App",
        nav_profile: "Profil",
        signin: "CONNEXION",
        signup: "S'inscrire",
        logout: "DÉCONNEXION",

        // Hero Section
        hero_badge: "PRÉSENTATION",
        hero_title: "AGRICULTURE",
        hero_subtitle: "INTELLIGENTE",
        hero_desc: "AgroVision révolutionne l'agriculture grâce à l'intelligence artificielle, en aidant les agriculteurs à analyser leurs cultures, anticiper les risques et améliorer les rendements.",
        doc: "Documentation",
        contact: "Contactez-nous",

        // About Us
        about_badge: "Qui sommes-nous",
        about_desc: "AgroVision est une plateforme technologique dédiée à l’agriculture intelligente. Notre mission est d’accompagner les agriculteurs et les administrateurs en leur fournissant des solutions innovantes basées sur la technologie et les données. Nous combinons expertise agricole et outils numériques afin de favoriser une agriculture plus efficace, durable et tournée vers l'avenir.",

        // Download App
        download_badge: "Expérience Mobile",
        download_title_part1: "Pourquoi télécharger l'application",
        download_title_part2: "?",
        download_desc: "Emportez la puissance de l'agriculture intelligente partout avec vous. Notre application mobile est conçue pour être votre compagnon de terrain quotidien.",
        download_available: "Disponible sur",
        benefit_1_title: "Diagnostic IA Instantané",
        benefit_1_desc: "Scannez vos plantes et recevez un diagnostic précis grâce à notre intelligence artificielle.",
        benefit_2_title: "Alertes Météo Précises",
        benefit_2_desc: "Anticipez les changements climatiques avec des prévisions hyper-locales pour vos champs.",
        benefit_3_title: "Conseils d'Experts",
        benefit_3_desc: "Accédez à une assistance personnalisée et des conseils d'experts agronomes 24h/24.",
        benefit_4_title: "Marché Intégré",
        benefit_4_desc: "Achetez vos intrants et vendez vos récoltes directement depuis votre smartphone.",

        // Weather Page
        weather_title: "Météo Agricole",
        weather_search: "Rechercher une ville...",
        weather_searching: "Rechercherche...",
        weather_updating: "Actualisation des données...",
        weather_temp: "Température",
        weather_feel: "Ressenti",
        weather_hum: "Humidité",
        weather_hum_opt: "Optimal: 40-70%",
        weather_wind: "Vent",
        weather_wind_dir: "Direction: Variable",
        weather_uv: "Index UV",
        weather_uv_max: "Max aujourd'hui",
        weather_agribot_intel: "AgroBot Intelligence",
        weather_advice_title: "Conseil Agricole Personnalisé",
        weather_plan_btn: "Voir plan d'action",
        weather_forecast_7: "Prévisions sur 7 jours",
        weather_today: "Auj.",

        // Weather Advice Logic (Professional translation)
        advice_wind: "Vent fort détecté. Il est déconseillé d'effectuer des pulvérisations aujourd'hui.",
        advice_hum: "Humidité élevée. Surveillez l'apparition possible de maladies fongiques.",
        advice_heat: "Température élevée. Augmentez la fréquence d'irrigation pour éviter le stress hydrique.",
        advice_frost: "Risque de gel. Protégez les cultures sensibles pendant la nuit.",
        advice_optimal: "Conditions optimales pour les travaux agricoles habituels.",

        // AgroBot Page
        bot_expert_title: "AgroBot Expert",
        bot_specialist: "Spécialiste Agronomie IA",
        bot_initial_msg: "Bonjour ! Je suis AgroBot, votre expert agronome personnel. Comment puis-je vous aider à optimiser vos cultures aujourd'hui ?",
        bot_placeholder: "Posez votre question agricole ici...",
        bot_user_label: "Vous",
        bot_bot_label: "AgroBot",
        bot_suggestion_1: "Comment traiter le mildiou sur les tomates ?",
        bot_suggestion_2: "Quelle est la meilleure période pour semer le blé ?",
        bot_suggestion_3: "Conseils pour l'irrigation goutte-à-goutte.",
        bot_suggestion_4: "Mes feuilles jaunissent, que faire ?",
        bot_response_template: "En tant qu'assistant spécialisé en agronomie, je vous conseille d'analyser d'abord l'humidité du sol. Concernant votre question, les meilleures pratiques recommandent un suivi rigoureux des apports. Souhaitez-vous un plan détaillé ?",

        // Marketplace
        market_title: "AgroMarket Pro",
        market_desc: "Équipez votre exploitation avec le meilleur de la technologie",
        market_seller: "Devenir Vendeur",
        market_offers: "Offres Spéciales",
        market_search: "Rechercher un produit...",
        market_buy: "Acheter",
        market_unit: "DT",
        market_cat_all: "Tous",
        market_cat_seeds: "Semences",
        market_cat_fert: "Fertilisants",
        market_cat_tech: "Technologie",
        market_cat_tools: "Outils",
        market_cat_prot: "Protection",
        // Product Tags
        tag_premium: "Premium",
        tag_bestseller: "Bestseller",
        tag_hightech: "High-Tech",
        tag_eco: "Éco-responsable",
        tag_natural: "Naturel",
        tag_innovation: "Innovation",
        tag_essential: "Indispensable",
        tag_bio: "Bio",
        tag_resistant: "Résistant",
        tag_boost: "Boost",
        tag_smart: "Smart",

        // Auth Pages (SignIn/SignUp)
        auth_back_title: "L'avenir de l'agriculture entre vos mains.",
        auth_back_desc: "Connectez-vous pour accéder à vos tableaux de bord et gérer vos cultures intelligemment.",
        auth_welcome: "Bon retour !",
        auth_subtitle: "Entrez vos coordonnées pour vous connecter.",
        auth_email: "Email",
        auth_pwd: "Mot de passe",
        auth_name: "Nom complet",
        auth_email_placeholder: "votre@email.com",
        auth_pwd_placeholder: "••••••••",
        auth_name_placeholder: "Jean Dupont",
        auth_confirm_pwd: "Confirmer le mot de passe",
        auth_terms: "En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.",
        auth_remember: "Se souvenir",
        auth_forgot: "Oublié ?",
        auth_login_btn: "Se connecter",
        auth_new_here: "Nouveau ici ?",
        auth_create_acc: "Créer un compte",
        auth_return_home: "Retour à l'accueil",
        auth_signup_title: "Rejoignez l'aventure",
        auth_signup_subtitle: "Commencez à optimiser vos rendements dès aujourd'hui.",
        auth_already_acc: "Déjà un compte ?",
        auth_signup_btn: "Créer mon compte",
        auth_pwd_error: "Les mots de passe ne correspondent pas !",
        gateway_h1: "Agriculture plus intelligente",
        gateway_h2: "Propulsée par l'IA",
        gateway_signup: "S'INSCRIRE GRATUITEMENT",
        gateway_signin: "SE CONNECTER AVEC VOTRE COMPTE",
        gateway_google: "CONTINUER AVEC GOOGLE",
        gateway_facebook: "CONTINUER AVEC FACEBOOK",

        // Footer
        footer_desc: "Révolutionner l'agriculture par la technologie et l'innovation pour un avenir durable.",
        footer_links: "Liens Rapides",
        footer_contact: "Contact",
        footer_rights: "Tous droits réservés.",
        footer_help: "Vous avez des questions ? Nous sommes là pour vous aider.",

        // Testimonials
        testimonials: [
            { text: "J'utilise mon application mobile sur le terrain tout le temps. Je ne peux pas vivre sans AgroVision !", author: "Amanda Staehely", company: "Pépinière Columbia" },
            { text: "AgroVision a transformé notre façon de gérer les cultures. Une technologie indispensable pour l'avenir.", author: "Jean Dupont", company: "Ferme de l'Avenir" },
            { text: "L'efficacité de nos récoltes a considérablement augmenté grâce aux analyses précises d'AgroVision.", author: "Sophie Martin", company: "Vignobles Martin" }
        ],

        // Contact Page
        contact_title: "Contact",
        contact_questions: "Vous avez des questions ?",
        contact_mailing: "Adresse postale",
        contact_name_placeholder: "Entrez votre nom",
        contact_email_placeholder: "Entrez votre email",
        contact_subject_placeholder: "Sujet",
        contact_message_placeholder: "Message",
        contact_send: "Envoyer le message",
        contact_alert: "Message envoyé ! (Simulation)"
    },
    EN: {
        // Navigation
        nav_home: "Home",
        nav_weather: "Weather",
        nav_scanner: "Plant Scanner",
        nav_bot: "AgroBot",
        nav_market: "Marketplace",
        nav_app: "App",
        nav_profile: "Profile",
        signin: "SIGN IN",
        signup: "Sign Up",
        logout: "LOGOUT",

        // Hero Section
        hero_badge: "INTRODUCING",
        hero_title: "SMART",
        hero_subtitle: "AGRICULTURE",
        hero_desc: "AgroVision revolutionizes agriculture with artificial intelligence, helping farmers analyze their crops, anticipate risks and improve yields.",
        doc: "Documentation",
        contact: "Contact Us",

        // About Us
        about_badge: "About Us",
        about_desc: "AgroVision is a technological platform dedicated to smart agriculture. Our mission is to support farmers and administrators by providing innovative solutions based on technology and data. We combine agricultural expertise and digital tools to foster a more efficient, sustainable, and future-oriented agriculture.",

        // Download App
        download_badge: "Mobile Experience",
        download_title_part1: "Why download the",
        download_title_part2: "app?",
        download_desc: "Take the power of smart farming with you everywhere. Our mobile app is designed to be your daily field companion.",
        download_available: "Available on",
        benefit_1_title: "Instant AI Diagnosis",
        benefit_1_desc: "Scan your plants and receive an accurate diagnosis thanks to our artificial intelligence.",
        benefit_2_title: "Accurate Weather Alerts",
        benefit_2_desc: "Anticipate climate changes with hyper-local forecasts for your fields.",
        benefit_3_title: "Expert Advice",
        benefit_3_desc: "Access personalized assistance and advice from expert agronomists 24/7.",
        benefit_4_title: "Integrated Market",
        benefit_4_desc: "Buy your inputs and sell your crops directly from your smartphone.",

        // Weather Page
        weather_title: "Agro Weather",
        weather_search: "Search for a city...",
        weather_searching: "Searching...",
        weather_updating: "Updating weather data...",
        weather_temp: "Temperature",
        weather_feel: "Feels like",
        weather_hum: "Humidity",
        weather_hum_opt: "Optimal: 40-70%",
        weather_wind: "Wind",
        weather_wind_dir: "Direction: Variable",
        weather_uv: "UV Index",
        weather_uv_max: "Today's Max",
        weather_agribot_intel: "AgroBot Intelligence",
        weather_advice_title: "Personalized Farming Advice",
        weather_plan_btn: "View action plan",
        weather_forecast_7: "7-Day Forecast",
        weather_today: "Today",

        // Weather Advice Logic
        advice_wind: "Strong wind detected. We advise against spraying today.",
        advice_hum: "High humidity. Monitor for potential fungal diseases.",
        advice_heat: "High temperature. Increase irrigation frequency to prevent water stress.",
        advice_frost: "Frost risk. Protect sensitive crops overnight.",
        advice_optimal: "Optimal conditions for regular field operations.",

        // AgroBot Page
        bot_expert_title: "AgroBot Expert",
        bot_specialist: "AI Agronomy Specialist",
        bot_initial_msg: "Hello! I am AgroBot, your personal agronomy expert. How can I help you optimize your crops today?",
        bot_placeholder: "Ask your agricultural question here...",
        bot_user_label: "You",
        bot_bot_label: "AgroBot",
        bot_suggestion_1: "How to treat blight on tomatoes?",
        bot_suggestion_2: "What is the best time to sow wheat?",
        bot_suggestion_3: "Drip irrigation advice requested.",
        bot_suggestion_4: "My leaves are turning yellow, what should I do?",
        bot_response_template: "As an AI agronomy assistant, I recommend first analyzing your soil moisture. Regarding your question, best practices suggest careful nutrient management. Would you like a detailed plan?",

        // Marketplace
        market_title: "AgroMarket Pro",
        market_desc: "Equip your farm with the best technology",
        market_seller: "Become a Seller",
        market_offers: "Special Offers",
        market_search: "Search for a product...",
        market_buy: "Buy Now",
        market_unit: "DT",
        market_cat_all: "All",
        market_cat_seeds: "Seeds",
        market_cat_fert: "Fertilizers",
        market_cat_tech: "Technology",
        market_cat_tools: "Tools",
        market_cat_prot: "Protection",
        // Product Tags
        tag_premium: "Premium",
        tag_bestseller: "Bestseller",
        tag_hightech: "High-Tech",
        tag_eco: "Eco-friendly",
        tag_natural: "Natural",
        tag_innovation: "Innovation",
        tag_essential: "Essential",
        tag_bio: "Organic",
        tag_resistant: "Resistant",
        tag_boost: "Growth Boost",
        tag_smart: "Smart",

        // Auth Pages
        auth_back_title: "The future of farming in your hands.",
        auth_back_desc: "Log in to access your dashboards and manage your crops intelligently.",
        auth_welcome: "Welcome back!",
        auth_subtitle: "Enter your details to log in.",
        auth_email: "Email",
        auth_pwd: "Password",
        auth_name: "Full Name",
        auth_email_placeholder: "your@email.com",
        auth_pwd_placeholder: "••••••••",
        auth_name_placeholder: "John Doe",
        auth_confirm_pwd: "Confirm Password",
        auth_terms: "By continuing, you agree to our Terms of Service and Privacy Policy.",
        auth_remember: "Remember me",
        auth_forgot: "Forgot?",
        auth_login_btn: "Login",
        auth_new_here: "New here?",
        auth_create_acc: "Create an account",
        auth_return_home: "Back to Home",
        auth_signup_title: "Join the Journey",
        auth_signup_subtitle: "Start optimizing your yields today.",
        auth_already_acc: "Already have an account?",
        auth_signup_btn: "Create my account",
        auth_pwd_error: "Passwords do not match!",
        gateway_h1: "Smarter farming",
        gateway_h2: "Powered by AI",
        gateway_signup: "SIGN UP FOR FREE",
        gateway_signin: "SIGN IN WITH YOUR ACCOUNT",
        gateway_google: "CONTINUE WITH GOOGLE",
        gateway_facebook: "CONTINUE WITH FACEBOOK",

        // Footer
        footer_desc: "Revolutionizing agriculture through technology and innovation for a sustainable future.",
        footer_links: "Quick Links",
        footer_contact: "Contact",
        footer_rights: "All rights reserved.",
        footer_help: "Have questions? We're here to help.",

        // Testimonials
        testimonials: [
            { text: "I use my mobile app in the field all the time. I can't live without AgroVision!", author: "Amanda Staehely", company: "Columbia Nursery" },
            { text: "AgroVision has transformed the way we manage crops. An indispensable technology for the future.", author: "John Doe", company: "Future Farm" },
            { text: "Our harvest efficiency has significantly increased thanks to AgroVision's precise analyses.", author: "Jane Smith", company: "Smith Vineyards" }
        ],

        // Contact Page
        contact_title: "Contact",
        contact_questions: "Got Questions?",
        contact_mailing: "Mailing Address",
        contact_name_placeholder: "Enter name",
        contact_email_placeholder: "Enter email",
        contact_subject_placeholder: "Subject",
        contact_message_placeholder: "Message",
        contact_send: "Send Message",
        contact_alert: "Message sent! (Simulation)"
    },
    AR: {
        // Navigation
        nav_home: "الرئيسية",
        nav_weather: "الطقس",
        nav_scanner: "ماسح النباتات",
        nav_bot: "أغرو بوت",
        nav_market: "المتجر",
        nav_app: "التطبيق",
        nav_profile: "الملف الشخصي",
        signin: "تسجيل الدخول",
        signup: "إنشاء حساب",
        logout: "تسجيل الخروج",

        // Hero Section
        hero_badge: "تقديم",
        hero_title: "زراعة",
        hero_subtitle: "ذكية",
        hero_desc: "تقوم أغروفيزيون بإحداث ثورة في الزراعة بفضل الذكاء الاصطناعي، من خلال مساعدة المزارعين على تحليل محاصيلهم وتوقع المخاطر وتحسين الإنتاجية.",
        doc: "الوثائق",
        contact: "اتصل بنا",

        // About Us
        about_badge: "من نحن",
        about_desc: "أغروفيزيون هي منصة تكنولوجية مخصصة للزراعة الذكية. مهمتنا هي دعم المزارعين والإداريين من خلال توفير حلول مبتكرة تعتمد على التكنولوجيا والبيانات. نحن نجمع بين الخبرة الزراعية والأدوات الرقمية لتعزيز زراعة أكثر كفاءة واستدامة وتوجهًا نحو المستقبل.",

        // Download App
        download_badge: "تجربة الهاتف المحمول",
        download_title_part1: "لماذا تختار تطبيق",
        download_title_part2: "؟",
        download_desc: "اصطحب قوة الزراعة الذكية معك في كل مكان. تم تصميم تطبيقنا للهواتف المحمولة ليكون رفيقك اليومي في الميدان.",
        download_available: "متوفر على",
        benefit_1_title: "تشخيص فوري بالذكاء الاصطناعي",
        benefit_1_desc: "امسح نباتاتك ضوئيًا واحصل على تشخيص دقيق بفضل ذكائنا الاصطناعي.",
        benefit_2_title: "تنبيهات جوية دقيقة",
        benefit_2_desc: "توقع التغيرات المناخية مع توقعات محلية دقيقة لحقولك.",
        benefit_3_title: "نصيحة خبير",
        benefit_3_desc: "احصل على مساعدة ونقاش متخصص من مهندسين زراعيين خبراء على مدار الساعة.",
        benefit_4_title: "سوق متكامل",
        benefit_4_desc: "اشترِ مستلزماتك وبع محاصيلك مباشرة من هاتفك الذكي.",

        // Weather Page
        weather_title: "الطقس الزراعي",
        weather_search: "ابحث عن مدينة...",
        weather_searching: "جاري البحث...",
        weather_updating: "جاري تحديث البيانات...",
        weather_temp: "درجة الحرارة",
        weather_feel: "درجة الحرارة المحسوسة",
        weather_hum: "الرطوبة",
        weather_hum_opt: "المستوى المثالي: 40-70%",
        weather_wind: "الرياح",
        weather_wind_dir: "الاتجاه: متغير",
        weather_uv: "مؤشر الأشعة فوق البنفسجية",
        weather_uv_max: "أقصى مستوى اليوم",
        weather_agribot_intel: "ذكاء أغرو بوت",
        weather_advice_title: "نصيحة زراعية مخصصة",
        weather_plan_btn: "عرض خطة العمل",
        weather_forecast_7: "توقعات 7 أيام",
        weather_today: "اليوم",

        // Weather Advice Logic
        advice_wind: "تم رصد رياح قوية. ننصح بعدم الرش اليوم.",
        advice_hum: "رطوبة عالية. راقب المحاصيل تحسباً للأمراض الفطرية.",
        advice_heat: "حرارة مرتفعة. زد من وتيرة الري لتجنب إجهاد المحاصيل.",
        advice_frost: "خطر الصقيع. احمِ المحاصيل الحساسة خلال الليل.",
        advice_optimal: "ظروف مثالية للقيام بالعمليات الزراعية المعتادة.",

        // AgroBot Page
        bot_expert_title: "أغرو بوت الخبير",
        bot_specialist: "أخصائي هندسة زراعية بذكاء اصطناعي",
        bot_initial_msg: "مرحباً! أنا أغرو بوت، خبيرك الزراعي الشخصي. كيف يمكنني مساعدتك في تحسين محاصيلك اليوم؟",
        bot_placeholder: "اطرح سؤالك الزراعي هنا...",
        bot_user_label: "أنت",
        bot_bot_label: "أغرو بوت",
        bot_suggestion_1: "كيف أعالج لفحة الطماطم؟",
        bot_suggestion_2: "ما هو أفضل وقت لزراعة القمح؟",
        bot_suggestion_3: "أحتاج نصيحة حول الري بالتنقيط.",
        bot_suggestion_4: "أوراق نباتي صفراء، ماذا أفعل؟",
        bot_response_template: "بصفتي مساعداً زراعياً خبيراً، أنصحك أولاً بتحليل رطوبة التربة. بخصوص سؤالك، توصي أفضل الممارسات بإدارة دقيقة للمغذيات. هل تود خطة مفصلة؟",

        // Marketplace
        market_title: "أغرو ماركت برو",
        market_desc: "جهز مزرعتك بأفضل التقنيات الحديثة",
        market_seller: "كن بائعاً",
        market_offers: "عروض خاصة",
        market_search: "ابحث عن منتج...",
        market_buy: "اشترِ الآن",
        market_unit: "د.ت",
        market_cat_all: "الكل",
        market_cat_seeds: "بذور",
        market_cat_fert: "أسمدة",
        market_cat_tech: "تكنولوجيا",
        market_cat_tools: "معدات",
        market_cat_prot: "وقاية",
        // Product Tags
        tag_premium: "ممتاز",
        tag_bestseller: "الأكثر مبيعاً",
        tag_hightech: "تقنية عالية",
        tag_eco: "صديق للبيئة",
        tag_natural: "طبيعي",
        tag_innovation: "ابتكار",
        tag_essential: "ضروري",
        tag_bio: "عضوي",
        tag_resistant: "مقاوم",
        tag_boost: "محفز نمو",
        tag_smart: "ذكـي",

        // Auth Pages
        auth_back_title: "مستقبل الزراعة بين يديك.",
        auth_back_desc: "سجل دخولك للوصول إلى لوحات التحكم وإدارة محاصيلك بذكاء.",
        auth_welcome: "مرحباً بعودتك!",
        auth_subtitle: "أدخل بياناتك لتسجيل الدخول.",
        auth_email: "البريد الإلكتروني",
        auth_pwd: "كلمة المرور",
        auth_name: "الاسم الكامل",
        auth_email_placeholder: "بريدك@الإلكتروني.com",
        auth_pwd_placeholder: "••••••••",
        auth_name_placeholder: "الاسم الكامل هنا",
        auth_confirm_pwd: "تأكيد كلمة المرور",
        auth_terms: "بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.",
        auth_remember: "تذكرني",
        auth_forgot: "نسيت؟",
        auth_login_btn: "تسجيل الدخول",
        auth_new_here: "جديد هنا؟",
        auth_create_acc: "إنشاء حساب",
        auth_return_home: "الرجوع للرئيسية",
        auth_signup_title: "انضم إلى المغامرة",
        auth_signup_subtitle: "ابدأ في تحسين إنتاجيتك اليوم.",
        auth_already_acc: "لديك حساب بالفعل؟",
        auth_signup_btn: "إنشاء الحساب",
        auth_pwd_error: "كلمات المرور غير متطابقة!",
        gateway_h1: "زراعة أكثر ذكاءً",
        gateway_h2: "مدعومة بالذكاء الاصطناعي",
        gateway_signup: "سجل مجاناً",
        gateway_signin: "سجل دخولك بحسابك",
        gateway_google: "المتابعة باستخدام جوجل",
        gateway_facebook: "المتابعة باستخدام فيسبوك",

        // Footer
        footer_desc: "إحداث ثورة في الزراعة من خلال التكنولوجيا والابتكار لمستقبل مستدام.",
        footer_links: "روابط سريعة",
        footer_contact: "اتصال",
        footer_rights: "جميع الحقوق محفوظة.",
        footer_help: "هل لديك أسئلة؟ نحن هنا للمساعدة.",

        // Testimonials
        testimonials: [
            { text: "أستخدم تطبيق الهاتف المحمول الخاص بي في الميدان طوال الوقت. لا يمكنني العيش بدون أغروفيزيون!", author: "أماندا ستايلي", company: "مشتل كولومبيا" },
            { text: "لقد حولت أغروفيزيون طريقتنا في إدارة المحاصيل. تقنية لا غنى عنها للمستقبل.", author: "جان دوبونت", company: "مزرعة المستقبل" },
            { text: "زادت كفاءة حصادنا بشكل ملحوظ بفضل تحليلات أغروفيزيون الدقيقة.", author: "صوفي مارتن", company: "كروم مارتن" }
        ],

        // Contact Page
        contact_title: "اتصل بنا",
        contact_questions: "هل لديك أسئلة؟",
        contact_mailing: "العنوان البريدي",
        contact_name_placeholder: "أدخل الاسم",
        contact_email_placeholder: "أدخل البريد الإلكتروني",
        contact_subject_placeholder: "الموضوع",
        contact_message_placeholder: "الرسالة",
        contact_send: "إرسال الرسالة",
        contact_alert: "تم إرسال الرسالة! (محاكاة)"
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('FR');

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            <div className={lang === 'AR' ? 'rtl' : 'ltr'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
