import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/CartContext';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { API_URL } from '../../constants/config';

const { width } = Dimensions.get('window');

const CATEGORIES = ['All', 'Fertilizers', 'Seeds', 'Tools', 'Pesticides', 'Equipment'];

const PRODUCTS = [
    {
        id: '1',
        name: 'Eco-Friendly Fertilizer',
        price: '45.00 DT',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1628352081506-83c43143df6a?q=80&w=400&auto=format&fit=crop',
        tag: 'Best Seller'
    },
    {
        id: '2',
        name: 'Alpha Wheat Seeds',
        price: '120.00 DT',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1542614391-44755106607e?q=80&w=400&auto=format&fit=crop',
        tag: 'New'
    },
    {
        id: '3',
        name: 'Pro Pruning Shears',
        price: '35.00 DT',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1599839619722-39751411883e?q=80&w=400&auto=format&fit=crop',
        tag: 'Top Rated'
    },
    {
        id: '4',
        name: 'Soil PH Meter',
        price: '85.00 DT',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop',
    },
];

export default function MarketplaceScreen() {
    const { t } = useTranslation();
    const { addToCart, cartCount } = useCart();
    const [products, setProducts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const router = useRouter();

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/products`);
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                setProducts(data);
            } else {
                setProducts(PRODUCTS); // Fallback to hardcoded
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts(PRODUCTS); // Fallback
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderProduct = ({ item }: { item: typeof PRODUCTS[0] }) => (
        <TouchableOpacity style={styles.productCard} activeOpacity={0.9} onPress={() => {
            addToCart(item);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            {item.tag && (
                <View style={[styles.tag, { backgroundColor: item.tag === 'New' ? '#2196F3' : '#FF9800' }]}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.wishlistBtn}>
                <Ionicons name="heart-outline" size={20} color="#333" />
            </TouchableOpacity>
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>
                <View style={styles.addToCartRow}>
                    <Text style={styles.addToCartText}>{t('marketplace.addToCart')}</Text>
                    <Ionicons name="add-circle" size={20} color="#4CAF50" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.searchBarContainer}>
                    <Feather name="search" size={20} color="#777" style={styles.searchIcon} />
                    <TextInput
                        placeholder={t('marketplace.searchPlaceholder')}
                        style={styles.searchInput}
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/cart')}>
                    <Ionicons name="cart-outline" size={24} color="#333" />
                    {cartCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Categories Bar */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {CATEGORIES.map((cat, index) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.categoryChip, index === 0 && styles.activeCategoryChip]}
                        >
                            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
                                {t(`marketplace.categories.${cat.toLowerCase()}`)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Exclusive Deals (Netflix-Style Large) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('marketplace.featuredOffers')}</Text>
                    <TouchableOpacity activeOpacity={0.9} style={styles.featuredCard}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop' }}
                            style={styles.featuredImage}
                        />
                        <View style={styles.featuredOverlay}>
                            <Text style={styles.featuredTag}>SUMMER SALE</Text>
                            <Text style={styles.featuredTitle}>30% OFF on all Organic Pesticides</Text>
                            <TouchableOpacity style={styles.shopNowBtn}>
                                <Text style={styles.shopNowText}>{t('common.seeAll')}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Product Grid */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{t('marketplace.recommended')}</Text>
                        <TouchableOpacity><Text style={styles.seeAll}>{t('common.seeAll')}</Text></TouchableOpacity>
                    </View>
                    <FlatList
                        data={filteredProducts}
                        renderItem={renderProduct}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                        columnWrapperStyle={styles.productRow}
                    />
                </View>

                {/* Popular Brands (Netflix small circles) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('marketplace.trustedBrands')}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandsContainer}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <View key={i} style={styles.brandCircle}>
                                <Ionicons name="leaf" size={24} color="#4CAF50" />
                            </View>
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 15,
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#333',
    },
    cartBtn: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#FF5252',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 1,
        minWidth: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#F5F5F5',
    },
    cartBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    addToCartRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    addToCartText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4CAF50',
    },
    scrollContent: {
        paddingBottom: 100, // Account for floating tab bar
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 10,
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        marginRight: 10,
    },
    activeCategoryChip: {
        backgroundColor: '#4CAF50',
    },
    categoryText: {
        fontWeight: '600',
        color: '#777',
    },
    activeCategoryText: {
        color: '#FFF',
    },
    section: {
        marginTop: 10,
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E3333',
        marginBottom: 15,
    },
    seeAll: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    featuredCard: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.35)',
        padding: 20,
        justifyContent: 'center',
    },
    featuredTag: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
        marginBottom: 8,
    },
    featuredTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        maxWidth: '80%',
        marginBottom: 15,
    },
    shopNowBtn: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    shopNowText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    productRow: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    productCard: {
        width: (width - 55) / 2,
        backgroundColor: '#FFF',
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    productImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#F9F9F9',
    },
    tag: {
        position: 'absolute',
        top: 10,
        left: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    tagText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    wishlistBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2E3333',
        marginBottom: 5,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    ratingText: {
        fontSize: 12,
        color: '#777',
        fontWeight: '600',
    },
    brandsContainer: {
        gap: 15,
        paddingBottom: 10,
    },
    brandCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
    },
});
