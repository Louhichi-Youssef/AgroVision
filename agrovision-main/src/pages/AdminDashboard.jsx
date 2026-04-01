import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [sellerRequests, setSellerRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, orders, sellers, users
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/signin');
            return;
        }

        const fetchData = async () => {
            try {
                // Parallel fetch
                const [ordersRes, sellerRes, usersRes, productsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/admin/orders`),
                    fetch(`${API_BASE_URL}/api/seller/requests`),
                    fetch(`${API_BASE_URL}/api/user/all`),
                    fetch(`${API_BASE_URL}/api/products`)
                ]);

                const [ordersData, sellerData, usersData, productsData] = await Promise.all([
                    ordersRes.json(),
                    sellerRes.json(),
                    usersRes.json(),
                    productsRes.json()
                ]);

                setOrders(Array.isArray(ordersData) ? ordersData : []);
                setSellerRequests(Array.isArray(sellerData) ? sellerData : []);
                setUsers(Array.isArray(usersData) ? usersData : []);
                setProducts(Array.isArray(productsData) ? productsData : []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    if (!user || user.role !== 'admin') return null;

    const stats = [
        { label: 'Revenu Total', value: `${orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0).toFixed(2)} DT`, icon: 'bx-dollar-circle', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Commandes', value: orders.length, icon: 'bx-shopping-bag', color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Demandes Vendeurs', value: sellerRequests.filter(r => r.status === 'pending').length, icon: 'bx-store', color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Utilisateurs', value: users.length, icon: 'bx-user', color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Produits', value: products.length, icon: 'bx-package', color: 'text-pink-500', bg: 'bg-pink-50' }
    ];

    const handleDeleteProduct = async (id) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            }
        } catch (e) {
            alert('Erreur lors de la suppression');
        }
    };

    const handleAction = async (endpoint, id, method = 'POST') => {
        if (!confirm('Êtes-vous sûr de vouloir effectuer cette action ?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/seller/${endpoint}/${id}`, { method });
            if (res.ok) {
                const updatedRequests = await fetch(`${API_BASE_URL}/api/seller/requests`).then(r => r.json());
                setSellerRequests(updatedRequests);
            }
        } catch (e) {
            alert('Erreur lors de l\'action');
        }
    };

    const renderDashboard = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                            <i className={`bx ${stat.icon}`}></i>
                        </div>
                        <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.label}</h4>
                        <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-8xl rotate-12 group-hover:rotate-0 transition-all">
                            <i className={`bx ${stat.icon}`}></i>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Mini-Table */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-slate-900">Commandes Récentes</h3>
                        <button onClick={() => setActiveTab('orders')} className="text-emerald-600 font-bold text-sm hover:underline">Voir Tout</button>
                    </div>
                    <div className="space-y-4">
                        {orders.slice(0, 5).map(order => (
                            <div key={order._id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                                        {order.user?.fullName?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{order.user?.fullName}</p>
                                        <p className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="font-black text-slate-900">{order.totalAmount} DT</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Market Performance Charts Simulation */}
                <div className="bg-[#1e293b] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-2">Performance du Marché</h3>
                        <p className="text-slate-400 text-sm mb-8">Croissance des ventes ce mois-ci</p>
                        <div className="h-48 flex items-end gap-3 px-4">
                            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div
                                        style={{ height: `${h}%` }}
                                        className="bg-emerald-500 rounded-t-xl w-full group-hover:bg-emerald-400 transition-all cursor-pointer relative"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {h * 15} DT
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-2 text-center font-bold uppercase">J{i + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-80' : 'w-24'} bg-white border-r border-slate-100 transition-all duration-300 flex flex-col fixed inset-y-0 z-50`}>
                <div className="p-8 pb-12 flex items-center justify-between">
                    <div className={`flex items-center gap-3 ${!sidebarOpen && 'hidden'}`}>
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <i className='bx bxs-leaf text-2xl'></i>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900">AgroVision</span>
                    </div>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                        <i className={`bx ${sidebarOpen ? 'bx-chevron-left' : 'bx-menu-alt-left'} text-2xl`}></i>
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { id: 'dashboard', label: 'Tableau de bord', icon: 'bx-grid-alt' },
                        { id: 'orders', label: 'Commandes', icon: 'bx-receipt' },
                        { id: 'sellers', label: 'Vendeurs (Req)', icon: 'bx-store' },
                        { id: 'products', label: 'Produits', icon: 'bx-package' },
                        { id: 'users', label: 'Clients', icon: 'bx-group' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <i className={`bx ${item.icon} text-2xl`}></i>
                            {sidebarOpen && <span>{item.label}</span>}
                            {item.id === 'sellers' && sellerRequests.filter(r => r.status === 'pending').length > 0 && sidebarOpen && (
                                <span className="ml-auto bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                    {sellerRequests.filter(r => r.status === 'pending').length}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all">
                        <i className='bx bx-log-out text-2xl'></i>
                        {sidebarOpen && <span>Déconnexion</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-24'} p-8 lg:p-12`}>
                {/* Top Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">
                            {activeTab === 'dashboard' ? 'Vue d\'ensemble' :
                                activeTab === 'orders' ? 'Gestion des Commandes' :
                                    activeTab === 'sellers' ? 'Demandes de Vendeurs' :
                                        activeTab === 'products' ? 'Catalogue Produits' : 'Base Clients'}
                        </h1>
                        <p className="text-slate-500 font-medium">Bienvenue, {user.fullName}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <i className='bx bx-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl'></i>
                            <input type="text" placeholder="Rechercher..." className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all w-64 shadow-sm" />
                        </div>
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm relative">
                            <i className='bx bx-bell text-2xl text-slate-400'></i>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && renderDashboard()}

                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Référence</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Client</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Date / Statut</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Total</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {orders.map(order => (
                                            <tr key={order._id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-6 font-bold text-slate-400">#{order._id.slice(-6).toUpperCase()}</td>
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-slate-900">{order.user?.fullName}</div>
                                                    <div className="text-[10px] text-slate-400">{order.user?.email}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-medium text-slate-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                                                    <div className={`mt-1 inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                                        order.status === 'delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {order.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 font-black text-slate-900">{order.totalAmount} DT</td>
                                                <td className="px-8 py-6">
                                                    <div className="flex justify-center gap-2">
                                                        <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"><i className='bx bx-low-vision text-xl'></i></button>
                                                        <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition-colors"><i className='bx bx-dots-vertical-rounded text-xl'></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'sellers' && (
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Entreprise</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Contact</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Produit</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Détails</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Aperçu</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest text-center">Décision</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {sellerRequests.map(req => (
                                            <tr key={req._id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-slate-900">{req.companyName}</div>
                                                    <div className="text-[10px] text-slate-400">{req.phone}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-xs text-slate-500 font-bold">{req.user?.email}</div>
                                                    <a href={`mailto:${req.user?.email}`} className="text-[10px] text-[#1DB954] hover:underline font-bold">Envoyer un email</a>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-slate-600 text-sm">{req.productType}</div>
                                                    <div className="text-[10px] text-slate-400 italic line-clamp-1">{req.description}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-black text-slate-900">{req.price} DT</div>
                                                    <div className="text-[10px] text-slate-500">Stock: {req.stock}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {req.productImage ? (
                                                        <img
                                                            src={`${API_BASE_URL}${req.productImage}`}
                                                            alt="Preview"
                                                            className="w-14 h-14 rounded-2xl object-cover shadow-lg hover:scale-150 transition-all cursor-zoom-in"
                                                            onClick={() => window.open(`${API_BASE_URL}${req.productImage}`, '_blank')}
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300">
                                                            <i className='bx bx-image text-2xl'></i>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <div className="flex justify-center flex-col items-center gap-2">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${req.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                                            req.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                                            }`}>
                                                            {req.status}
                                                        </span>
                                                        <div className="flex justify-center gap-2 mt-2">
                                                            {req.status === 'pending' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleAction('approve', req._id)}
                                                                        className="w-8 h-8 bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all text-lg flex items-center justify-center"
                                                                    >
                                                                        <i className='bx bx-check'></i>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleAction('reject', req._id)}
                                                                        className="w-8 h-8 bg-red-500 text-white rounded-lg shadow-lg shadow-red-500/20 hover:scale-110 active:scale-95 transition-all text-lg flex items-center justify-center"
                                                                    >
                                                                        <i className='bx bx-x'></i>
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <span className="text-xs font-bold text-slate-300 italic">Déjà traité</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Utilisateur</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Rôle</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Date d'inscription</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                            <i className='bx bx-user text-xl'></i>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900">{u.fullName}</div>
                                                            <div className="text-[10px] text-slate-400">{u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                                        }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-slate-500 text-sm">
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'products' && (
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Produit</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Catégorie</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest">Prix / Stock</th>
                                            <th className="px-8 py-6 text-slate-400 font-bold uppercase text-[10px] tracking-widest text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {products.map(p => (
                                            <tr key={p._id} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                                                        <div>
                                                            <div className="font-bold text-slate-900">{p.name}</div>
                                                            <div className="text-[10px] text-slate-400 max-w-[200px] truncate">{p.desc}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-600">
                                                        {p.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-[#1DB954]">{p.price}</div>
                                                    <div className="text-xs text-slate-400 font-bold">Stock: {p.stock || 'N/A'}</div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <button onClick={() => handleDeleteProduct(p._id)} className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center mx-auto">
                                                        <i className='bx bx-trash text-xl'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
