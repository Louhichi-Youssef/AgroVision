import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Initial Load from LocalStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('agrovision_cart');
        const savedFavs = localStorage.getItem('agrovision_favorites');
        if (savedCart) setCartItems(JSON.parse(savedCart));
        if (savedFavs) setFavorites(JSON.parse(savedFavs));
    }, []);

    // Clear items on logout
    useEffect(() => {
        if (!user) {
            setCartItems([]);
            setFavorites([]);
            localStorage.removeItem('agrovision_cart');
            localStorage.removeItem('agrovision_favorites');
        }
    }, [user]);

    // Load from DB when user logs in
    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.id) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/user/${user.id}`);
                    const data = await response.json();
                    if (response.ok) {
                        // Merge or overwrite? Let's overwrite with DB state as truth
                        if (data.cart) {
                            setCartItems(data.cart.map(item => ({
                                ...item.product,
                                quantity: item.quantity
                            })));
                        }
                        if (data.favorites) {
                            setFavorites(data.favorites);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [user]);

    // Save to LocalStorage and DB
    useEffect(() => {
        localStorage.setItem('agrovision_cart', JSON.stringify(cartItems));

        const syncCartWithDB = async () => {
            if (user && user.id) {
                try {
                    await fetch(`${API_BASE_URL}/api/user/cart`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: user.id,
                            cart: cartItems.map(item => ({
                                product: item._id || item.id,
                                quantity: item.quantity
                            }))
                        })
                    });
                } catch (error) {
                    console.error("Error syncing cart:", error);
                }
            }
        };
        syncCartWithDB();
    }, [cartItems, user]);

    useEffect(() => {
        localStorage.setItem('agrovision_favorites', JSON.stringify(favorites));

        const syncFavsWithDB = async () => {
            if (user && user.id) {
                try {
                    await fetch(`${API_BASE_URL}/api/user/favorites`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: user.id,
                            favorites: favorites.map(item => item._id || item.id)
                        })
                    });
                } catch (error) {
                    console.error("Error syncing favorites:", error);
                }
            }
        };
        syncFavsWithDB();
    }, [favorites, user]);

    const addToCart = (product) => {
        const prodId = product._id || product.id;
        setCartItems(prev => {
            const exists = prev.find(item => (item._id || item.id) === prodId);
            if (exists) {
                return prev.map(item =>
                    (item._id || item.id) === prodId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => (item._id || item.id) !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCartItems(prev => prev.map(item => {
            if ((item._id || item.id) === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const toggleFavorite = (product) => {
        const prodId = product._id || product.id;
        setFavorites(prev => {
            const exists = prev.find(item => (item._id || item.id) === prodId);
            if (exists) {
                return prev.filter(item => (item._id || item.id) !== prodId);
            }
            return [...prev, product];
        });
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => {
        const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return acc + (priceValue * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            favorites,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleFavorite,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
