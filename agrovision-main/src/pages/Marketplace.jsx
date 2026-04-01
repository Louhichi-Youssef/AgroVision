import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Marketplace = () => {
    const { t, lang } = useLanguage();
    const navigate = useNavigate();
    const { addToCart, toggleFavorite, favorites, cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
    const { user } = useAuth();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

    const handleProtectedAction = (action) => {
        if (!user) {
            navigate('/signin', { state: { from: window.location.pathname } });
            return;
        }
        action();
    };

    const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showOnlyOffers, setShowOnlyOffers] = useState(false);

    // State for local products fetched from DB
    const [dbProducts, setDbProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFileName, setSelectedFileName] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/products`);
                const data = await response.json();
                setDbProducts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        t('market_cat_all'),
        t('market_cat_seeds'),
        t('market_cat_fert'),
        t('market_cat_tech'),
        t('market_cat_tools'),
        t('market_cat_prot')
    ];

    const [selectedCategory, setSelectedCategory] = useState(t('market_cat_all'));

    // Helper to map DB category strings to translation keys
    const getTranslatedCategory = (cat) => {
        if (cat === "Semences") return t('market_cat_seeds');
        if (cat === "Fertilisants") return t('market_cat_fert');
        if (cat === "Technologie") return t('market_cat_tech');
        if (cat === "Outils") return t('market_cat_tools');
        if (cat === "Protection") return t('market_cat_prot');
        return cat;
    };

    const filteredProducts = dbProducts.filter(p => {
        const translatedCat = getTranslatedCategory(p.category);
        const matchesCategory = selectedCategory === t('market_cat_all') || translatedCat === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.desc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesOffers = showOnlyOffers ? p.isOffer : true;
        return matchesCategory && matchesSearch && matchesOffers;
    });

    const isFavorite = (id) => favorites.some(fav => fav._id === id || fav.id === id);

    return (
        <div className="pt-32 min-h-screen bg-slate-50/50 pb-20">
            {/* Cart Button Floating */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#1DB954] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
            >
                <i className='bx bx-shopping-bag text-3xl'></i>
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Hero Section */}
            <div className="max-w-[98%] lg:max-w-[1650px] mx-auto px-6 mb-16">
                <div className="relative overflow-hidden rounded-[3rem] bg-[#1e293b] p-12 lg:p-20 text-white shadow-2xl">
                    <div className={`relative z-10 max-w-2xl ${lang === 'AR' ? 'ml-auto text-right' : 'text-left'}`}>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-xs font-bold tracking-widest uppercase mb-6 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                            <i className='bx bx-shopping-bag text-lg'></i>
                            {t('market_title')}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
                            {t('market_desc')}
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
                            Semences certifiées, outils professionnels et capteurs IoT. Le tout livré directement dans votre champ.
                        </p>
                        <div className={`flex flex-wrap gap-4 ${lang === 'AR' ? 'justify-end' : ''}`}>
                            <button
                                onClick={() => setShowOnlyOffers(!showOnlyOffers)}
                                className={`${showOnlyOffers ? 'bg-orange-500' : 'bg-[#1DB954]'} hover:opacity-90 text-black font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-green-500/20 flex items-center gap-2`}
                            >
                                <i className={`bx ${showOnlyOffers ? 'bx-x' : 'bx-party'}`}></i>
                                {showOnlyOffers ? (lang === 'AR' ? 'عرض الكل' : 'Voir tout') : t('market_offers')}
                            </button>
                            <button
                                onClick={() => handleProtectedAction(() => setIsSellerModalOpen(true))}
                                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all border border-white/10 backdrop-blur-md"
                            >
                                {t('market_seller')}
                            </button>
                        </div>
                    </div>
                    {/* Abstract background shapes */}
                    <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-[#1DB954]/10 rounded-full blur-[120px]"></div>
                    <div className="absolute -left-20 -bottom-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]"></div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-[98%] lg:max-w-[1650px] mx-auto px-6 mb-12">
                <div className={`flex flex-col md:flex-row justify-between items-center gap-8 ${lang === 'AR' ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex gap-2 p-1.5 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-x-auto max-w-full no-scrollbar ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-3 rounded-[1.25rem] text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-[#1DB954] text-white shadow-lg shadow-green-500/20'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={t('market_search')}
                            className={`w-full ${lang === 'AR' ? 'pr-12 pl-6 text-right' : 'pl-12 pr-6 text-left'} py-4 bg-white border border-slate-100 shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all`}
                        />
                        <i className={`bx bx-search absolute ${lang === 'AR' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-2xl text-slate-400`}></i>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-[98%] lg:max-w-[1650px] mx-auto px-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-bold">Chargement des produits...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <div key={product._id || product.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-xl shadow-slate-200/50 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute top-4 ${lang === 'AR' ? 'right-4' : 'left-4'} flex flex-col gap-2`}>
                                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                            {product.tag}
                                        </span>
                                        {product.isOffer && (
                                            <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                                -{product.discount}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleProtectedAction(() => addToCart(product))}
                                        className={`absolute bottom-4 ${lang === 'AR' ? 'left-4' : 'right-4'} w-12 h-12 bg-[#1DB954] text-white rounded-2xl flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-xl shadow-green-500/20 active:scale-95`}
                                    >
                                        <i className='bx bx-cart-add text-2xl'></i>
                                    </button>
                                </div>
                                <div className={`p-8 ${lang === 'AR' ? 'text-right' : 'text-left'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[#1DB954] text-xs font-bold uppercase tracking-widest">{getTranslatedCategory(product.category)}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#1DB954] transition-colors">{product.name}</h3>
                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.desc}</p>
                                    <div className={`flex items-center justify-between pt-6 border-t border-slate-50 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                        <span className="text-2xl font-black text-slate-900">{product.price}</span>
                                        <button
                                            onClick={() => handleProtectedAction(() => toggleFavorite(product))}
                                            className={`text-2xl transition-all duration-300 ${isFavorite(product._id || product.id) ? 'text-red-500 scale-125' : 'text-slate-300 hover:text-red-400'}`}
                                        >
                                            <i className={`bx ${isFavorite(product._id || product.id) ? 'bxs-heart' : 'bx-heart'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Marketplace Insights (Travailler %) */}
            <div className="max-w-[98%] lg:max-w-[1650px] mx-auto px-6 mt-20">
                <div className="bg-white rounded-[3rem] p-10 lg:p-16 border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className={`flex flex-col md:flex-row justify-between items-center gap-12 ${lang === 'AR' ? 'md:flex-row-reverse' : ''}`}>
                        <div className="md:w-1/3">
                            <h2 className={`text-3xl font-black text-slate-900 mb-4 ${lang === 'AR' ? 'text-right' : ''}`}>
                                {lang === 'AR' ? 'أداء السوق' : 'Performance du Marché'}
                            </h2>
                            <p className={`text-slate-500 mb-8 ${lang === 'AR' ? 'text-right' : ''}`}>
                                {lang === 'AR' ? 'تحليل مباشر لنمو السوق وتوافر المنتجات المهنية.' : 'Analyse en temps réel de la croissance du marché et de la disponibilité des produits.'}
                            </p>
                            <div className="space-y-6">
                                {[
                                    { label: lang === 'AR' ? 'نمو المبيعات' : 'Croissance des Ventes', val: 84, color: 'bg-green-500' },
                                    { label: lang === 'AR' ? 'توسع شبكة البائعين' : 'Expansion réseau vendeurs', val: 62, color: 'bg-blue-500' },
                                    { label: lang === 'AR' ? 'رضا العملاء' : 'Satisfaction Client', val: 98, color: 'bg-[#1DB954]' }
                                ].map((stat, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className={`flex justify-between text-sm font-bold text-slate-700 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                            <span>{stat.label}</span>
                                            <span>{stat.val}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${stat.color} transition-all duration-1000`}
                                                style={{ width: `${stat.val}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                            {[
                                { label: lang === 'AR' ? 'بائع نشط' : 'Vendeurs Actifs', val: '1,250+', icon: 'bx-store' },
                                { label: lang === 'AR' ? 'منتج معتمد' : 'Produits Certifiés', val: '15.4k', icon: 'bx-check-shield' },
                                { label: lang === 'AR' ? 'صفقة يومية' : 'Transactions /jour', val: '4.8k', icon: 'bx-trending-up' },
                                { label: lang === 'AR' ? 'تغطية' : 'Couverture', val: '95%', icon: 'bx-map-alt' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-[2rem] text-center hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-[#1DB954]">
                                        <i className={`bx ${item.icon} text-2xl`}></i>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900">{item.val}</h4>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Seller Registration Modal */}
            {isSellerModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsSellerModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="p-12">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900">{lang === 'AR' ? 'كن بائعاً شريكاً' : 'Devenir Vendeur Partenaire'}</h2>
                                    <p className="text-slate-500 mt-2">{lang === 'AR' ? 'انضم إلى منصتنا وقم ببيع منتجاتك الزراعية' : 'Rejoignez notre plateforme et vendez vos produits agricoles.'}</p>
                                </div>
                                <button onClick={() => setIsSellerModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all">
                                    <i className='bx bx-x text-3xl'></i>
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={async (e) => {
                                e.preventDefault();
                                if (!user) {
                                    alert(lang === 'AR' ? 'يرجى تسجيل الدخول أولاً' : 'Veuillez vous connecter d\'abord');
                                    return;
                                }

                                const formData = new FormData(e.currentTarget);
                                formData.append('userId', user.id);

                                try {
                                    const response = await fetch(`${API_BASE_URL}/api/seller/request`, {
                                        method: 'POST',
                                        body: formData
                                    });
                                    if (response.ok) {
                                        alert(lang === 'AR' ? 'تم تقديم الطلب بنجاح!' : 'Demande envoyée avec succès !');
                                        setIsSellerModalOpen(false);
                                        setSelectedFileName(''); // Reset
                                    } else {
                                        alert('Error submitting request');
                                    }
                                } catch (err) {
                                    alert('Server error');
                                }
                            }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-2">{lang === 'AR' ? 'اسم الشركة' : "Nom de l'entreprise"}</label>
                                        <input type="text" name="companyName" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-2">{lang === 'AR' ? 'رقم الهاتف' : 'Téléphone'}</label>
                                        <input type="tel" name="phone" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-2">{lang === 'AR' ? 'السعر (DT)' : 'Prix (DT)'}</label>
                                        <input type="number" name="price" required min="1" step="0.01" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-2">{lang === 'AR' ? 'الكمية' : 'Stock'}</label>
                                        <input type="number" name="stock" required min="1" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">{lang === 'AR' ? 'نوع المنتجات' : 'Type de produits'}</label>
                                    <select name="productType" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none text-slate-900">
                                        <option>{t('market_cat_seeds')}</option>
                                        <option>{t('market_cat_fert')}</option>
                                        <option>{t('market_cat_tech')}</option>
                                        <option>{t('market_cat_tools')}</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">{lang === 'AR' ? 'صورة المنتج' : 'Photo du produit'}</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            name="productImage"
                                            accept="image/*"
                                            required
                                            className="hidden"
                                            id="productImage"
                                            onChange={(e) => setSelectedFileName(e.target.files[0]?.name || '')}
                                        />
                                        <label
                                            htmlFor="productImage"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-white hover:border-green-500 transition-all cursor-pointer group"
                                        >
                                            <i className='bx bx-cloud-upload text-3xl text-slate-400 group-hover:text-green-500 mb-2'></i>
                                            <span className="text-xs font-bold text-slate-400 group-hover:text-green-500 uppercase tracking-widest text-center px-4">
                                                {selectedFileName || (lang === 'AR' ? 'اضغط لرفع الصورة' : 'Cliquez pour uploader')}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-2">{lang === 'AR' ? 'وصف النشاط' : "Description de l'activité"}</label>
                                    <textarea name="description" rows="4" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"></textarea>
                                </div>
                                <button type="submit" className="w-full py-5 bg-[#1DB954] text-white font-black text-lg rounded-2xl shadow-xl shadow-green-500/20 hover:bg-[#17a34a] transition-all transform active:scale-[0.98]">
                                    {lang === 'AR' ? 'إرسال الطلب' : 'Envoyer ma demande'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Cart Sidebar */}
            {
                isCartOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
                        <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in ${lang === 'AR' ? 'slide-in-from-left' : 'slide-in-from-right'} duration-500`}>
                            <div className={`p-8 border-b border-slate-100 flex justify-between items-center ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">{lang === 'AR' ? 'سلتي' : 'Mon Panier'}</h2>
                                    <p className="text-slate-500 text-sm font-medium">{cartCount} {lang === 'AR' ? 'منتجات' : 'articles'}</p>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">
                                    <i className='bx bx-x text-2xl'></i>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                {cartItems.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                            <i className='bx bx-shopping-bag text-5xl text-slate-200'></i>
                                        </div>
                                        <p className="text-slate-400 font-bold">{lang === 'AR' ? 'سلتك فارغة حالياً' : 'Votre panier est vide'}</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-6 text-[#1DB954] font-bold underline"
                                        >
                                            {lang === 'AR' ? 'ابدأ التسوق' : 'Commencer mes achats'}
                                        </button>
                                    </div>
                                ) : (
                                    cartItems.map(item => (
                                        <div key={item._id || item.id} className={`flex gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 group ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                            <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className={`font-bold text-slate-900 truncate ${lang === 'AR' ? 'text-right' : ''}`}>{item.name}</h4>
                                                <p className={`text-sm text-[#1DB954] font-black mt-1 ${lang === 'AR' ? 'text-right' : ''}`}>{item.price}</p>
                                                <div className={`flex items-center gap-3 mt-3 ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                                    <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
                                                        <button onClick={() => updateQuantity(item._id || item.id, -1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-50 rounded-lg">-</button>
                                                        <span className="text-xs font-black min-w-4 text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item._id || item.id, 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-50 rounded-lg">+</button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item._id || item.id)} className="text-slate-300 hover:text-red-500 transition-colors ml-auto">
                                                        <i className='bx bx-trash'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cartItems.length > 0 && (
                                <div className="p-8 border-t border-slate-100 bg-white space-y-6">
                                    <div className={`flex justify-between items-center ${lang === 'AR' ? 'flex-row-reverse' : ''}`}>
                                        <span className="text-slate-500 font-bold">{lang === 'AR' ? 'المجموع الإجمالي' : 'Total global'}</span>
                                        <span className="text-3xl font-black text-slate-900">{cartTotal.toFixed(2)} {t('market_unit')}</span>
                                    </div>
                                    <button
                                        onClick={() => handleProtectedAction(() => {
                                            alert(lang === 'AR' ? 'تم استلام طلبك، سنتصل بك قريباً!' : 'Commande reçue, nous vous contacterons bientôt !');
                                        })}
                                        className="w-full py-5 bg-[#1DB954] text-white font-black text-lg rounded-2xl shadow-xl shadow-green-500/20 hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <i className='bx bx-check-shield'></i>
                                        {lang === 'AR' ? 'إتمام الشراء' : 'Commander maintenant'}
                                    </button>
                                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                                        {lang === 'AR' ? 'دفع آمن 100٪' : 'Paiement 100% Sécurisé'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Marketplace;
