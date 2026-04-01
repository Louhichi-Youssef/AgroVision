import React, { useState, useRef, useEffect, useCallback } from 'react';
import Spline from '@splinetool/react-spline';
import { useLanguage } from '../context/LanguageContext';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * AGROBOT - WHITE & GREEN EDITION (LIGHT PREMIUM)
 * 
 * Enhancements:
 * - Fluid White & Vibrant Green fresh design.
 * - Glassmorphism UI for light mode.
 * - High-visibility 3D Spline on light background.
 * - Sophisticated shadows and minimalist borders.
 */
const AgroBot = () => {
    const { t, lang } = useLanguage();
    const { id: urlChatId } = useParams();
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/chat';

    const getWelcomeMessage = useCallback(() => ({
        role: 'assistant',
        content: t('bot_initial_msg') || "Bienvenue dans votre espace AgroBot ! 🌱"
    }), [t]);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chatToDelete, setChatToDelete] = useState(null);
    const [isInitialLoading, setIsInitialLoading] = useState(false);

    const suggestions = [
        t('bot_suggestion_1') || "Mildiou ?",
        t('bot_suggestion_2') || "Semis blé ?",
        t('bot_suggestion_3') || "Irrigation ?",
        t('bot_suggestion_4') || "Feuilles jaunes ?"
    ];

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(`${API_URL}/history`);
                if (res.ok) {
                    const data = await res.json();
                    setConversations(data);
                }
            } catch (err) {
                console.error("History fetch error:", err);
            }
        };
        fetchHistory();
    }, [currentChatId]);

    useEffect(() => {
        if (urlChatId) {
            if (urlChatId !== currentChatId) {
                loadConversation(urlChatId);
            }
        } else {
            setMessages([getWelcomeMessage()]);
            setCurrentChatId(null);
        }
    }, [urlChatId, getWelcomeMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const loadConversation = async (id) => {
        if (!id) return;
        setIsInitialLoading(true);
        try {
            const res = await fetch(`${API_URL}/${id}`);
            if (res.ok) {
                const data = await res.json();
                const visibleMessages = data.messages
                    .filter(m => m.role !== 'system')
                    .map(m => ({
                        role: m.role === 'assistant' || m.role === 'model' ? 'assistant' : 'user',
                        content: m.content
                    }));

                setMessages(visibleMessages.length > 0 ? visibleMessages : [getWelcomeMessage()]);
                setCurrentChatId(id);
            } else {
                navigate('/AgroBot');
            }
        } catch (err) {
            console.error("Load error:", err);
            navigate('/AgroBot');
        } finally {
            setIsInitialLoading(false);
            setShowSidebar(false);
        }
    };

    const startNewChat = () => {
        setMessages([getWelcomeMessage()]);
        setCurrentChatId(null);
        navigate('/AgroBot');
        setShowSidebar(false);
    };

    const handleSendMessage = async (text) => {
        const msgText = text || input;
        if (!msgText.trim()) return;

        const userMsg = { role: 'user', content: msgText };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: msgText,
                    conversationId: currentChatId
                })
            });

            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

                if (!currentChatId && data.conversationId) {
                    setCurrentChatId(data.conversationId);
                    navigate(`/AgroBot/${data.conversationId}`, { replace: true });
                }
            }
        } catch (err) {
            console.error("Send error:", err);
            setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Erreur serveur. Vérifiez votre connexion." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const confirmDelete = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setChatToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!chatToDelete) return;
        const id = chatToDelete;

        setShowDeleteModal(false);
        setConversations(prev => prev.filter(c => c._id !== id));
        if (currentChatId === id) startNewChat();

        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Delete failed on server");
        } catch (err) {
            console.error("Delete error:", err);
            fetchHistory();
            alert("Erreur lors de la suppression.");
        } finally {
            setChatToDelete(null);
        }
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden font-sans pt-16 selection:bg-[#1DB954]/20">

            {/* 1. SIDEBAR - MINIMALIST PRO */}
            <div className={`fixed inset-y-0 left-0 pt-16 z-40 w-72 bg-[#f9fafb] border-r border-slate-200 transform transition-all duration-300 md:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:static flex flex-col`}>

                <div className="p-5 border-b border-slate-200">
                    <button
                        onClick={startNewChat}
                        className="w-full bg-[#4CAF50] text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#43a047] transition-colors shadow-sm active:scale-[0.98]"
                    >
                        <i className='bx bx-plus text-lg'></i>
                        <span className="text-sm">Nouveau Chat</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-chat-scrollbar">
                    <div className="px-3 py-2">
                        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Historique</h2>
                    </div>

                    {conversations.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-xs text-slate-400">Aucun historique</p>
                        </div>
                    ) : (
                        conversations.map(chat => (
                            <div
                                key={chat._id}
                                onClick={() => loadConversation(chat._id)}
                                className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${currentChatId === chat._id
                                    ? 'bg-slate-200/50 text-[#333]'
                                    : 'hover:bg-slate-200/30 text-slate-600'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <i className='bx bx-message-square-detail text-lg opacity-40'></i>
                                    <p className="text-sm font-medium truncate pr-6">{chat.title || "Session"}</p>
                                </div>
                                <button
                                    onClick={(e) => confirmDelete(e, chat._id)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                                >
                                    <i className='bx bx-trash text-base'></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Overlay */}
            {showSidebar && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden animate-fade-in" onClick={() => setShowSidebar(false)}></div>
            )}

            {/* 2. MAIN CHAT AREA - ULTRACLEAN PRO */}
            <div className="flex-1 flex flex-col relative bg-white overflow-hidden">

                {/* DISCRETE 3D SPLINE - PREMIUM BACKGROUND DETAIL */}
                <div className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none flex items-center justify-center">
                    <div className="w-[110%] h-[110%] transform scale-500">
                        <Spline scene="https://prod.spline.design/hVGVRMoBFjvVfPV3/scene.splinecode" />
                    </div>
                </div>

                {/* Header - Masterclass Professional (Matches User Image) */}
                <div className="flex-none px-6 md:px-10 py-5 border-b border-slate-100 flex items-center justify-between bg-white/70 backdrop-blur-md z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setShowSidebar(true)} className="md:hidden p-2 -ml-2 text-2xl text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
                            <i className='bx bx-menu-alt-left'></i>
                        </button>

                        <div className="relative">
                            <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white text-[2rem] shadow-sm">
                                <i className='bx bx-bot'></i>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h1 className="text-xl font-bold text-[#333] tracking-tight leading-tight">
                                AgroBot
                            </h1>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                                <span className="text-[13px] font-medium text-slate-500 tracking-tight">En ligne</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Panel - Ultra Minimalist */}
                <div className="flex-1 overflow-y-auto px-4 md:px-20 py-10 space-y-10 z-10 custom-chat-scrollbar relative scroll-smooth">

                    {isInitialLoading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center animate-fade-in">
                            <div className="w-8 h-8 border-2 border-[#4CAF50] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-6 animate-fade-in-up ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-[#333] text-white' : 'bg-[#4CAF50] text-white'}`}>
                                <i className={`bx ${msg.role === 'user' ? 'bx-user' : 'bx-bot'} text-lg`}></i>
                            </div>
                            <div className={`max-w-[75%] space-y-1`}>
                                <div className={`text-sm md:text-[16px] leading-relaxed text-[#374151] whitespace-pre-wrap ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && !isInitialLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] rounded-tl-none border border-slate-100 shadow-sm">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} className="h-2 clear-both" />
                </div>

                {/* Input Area - Clean Minimalist */}
                <div className="px-4 md:px-20 pb-8 pt-2 z-20">
                    <div className="max-w-4xl mx-auto space-y-4">

                        {messages.length < 2 && !isInitialLoading && (
                            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                                {suggestions.map((s, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSendMessage(s)}
                                        className="bg-[#f3f4f6] px-4 py-2 rounded-full text-[12px] font-medium text-slate-600 hover:bg-[#e5e7eb] transition-all whitespace-nowrap"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative flex items-center border border-slate-200 rounded-2xl bg-white shadow-sm ring-offset-white focus-within:ring-2 focus-within:ring-[#4CAF50] focus-within:ring-offset-1 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Posez votre question à AgroBot..."
                                className="flex-1 bg-transparent py-4 px-6 md:px-8 outline-none text-[#333] text-[15px] md:text-base placeholder:text-slate-400"
                            />
                            <div className="pr-3">
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!input.trim() || isTyping}
                                    className="p-2 text-[#4CAF50] hover:text-[#43a047] disabled:text-slate-300 transition-colors"
                                >
                                    <i className='bx bxs-send text-3xl'></i>
                                </button>
                            </div>
                        </div>
                        <p className="text-[11px] text-center text-slate-400">
                            AgroBot peut faire des erreurs. Envisagez de vérifier les informations importantes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/20 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center border border-slate-50 animate-scale-in">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                            <i className='bx bx-trash text-3xl'></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Supprimer la session ?</h3>
                        <p className="text-slate-500 mb-8 font-medium text-sm leading-relaxed">Cette action est irréversible. Toutes les données de cette conversation seront perdues.</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={handleDelete} className="bg-red-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-500/20 active:scale-95 transition-all text-sm">Supprimer définitivement</button>
                            <button onClick={() => setShowDeleteModal(false)} className="bg-slate-100 text-slate-600 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-colors text-sm">Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .custom-chat-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-chat-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
                .custom-chat-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </div>
    );
};

export default AgroBot;
