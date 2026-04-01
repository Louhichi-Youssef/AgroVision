import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    const [profile, setProfile] = React.useState({
        name: 'User',
        email: 'user@example.com',
        location: 'Location',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
    });

    React.useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const name = await AsyncStorage.getItem('user_name');
            const email = await AsyncStorage.getItem('user_email');
            const loc = await AsyncStorage.getItem('farm_location');

            setProfile(prev => ({
                ...prev,
                name: name || prev.name,
                email: email || prev.email,
                location: loc || prev.location
            }));
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };

    const changeLanguage = async (lng: string) => {
        await i18n.changeLanguage(lng);
        await AsyncStorage.setItem('user-language', lng);
        // RTL logic is handled in i18n.ts init, but for immediate change:
        const isRtl = lng === 'ar';
        const { I18nManager } = require('react-native');
        if (I18nManager.isRTL !== isRtl) {
            I18nManager.allowRTL(isRtl);
            I18nManager.forceRTL(isRtl);
            // On some versions of React Native/Expo, a restart is required for RTL change
            Alert.alert(
                t('common.success'),
                t('profile.restartRTL'),
                [{ text: 'OK' }]
            );
        }
    };

    const handleLogout = () => {
        Alert.alert(
            t('common.logout'),
            t('profile.logoutConfirm'),
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('common.logout'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Clear user data but keep language preference
                            const keys = ['user_name', 'user_email', 'farm_name', 'farm_location', 'farm_size'];
                            await AsyncStorage.multiRemove(keys);
                            router.replace('/');
                        } catch (error) {
                            console.error('Error during logout:', error);
                            router.replace('/');
                        }
                    }
                }
            ]
        );
    };

    const MENU_ITEMS = [
        { icon: 'leaf', label: t('profile.myFarmDetails'), color: '#4CAF50', route: '/farm-details' },
        { icon: 'analytics', label: t('profile.harvestStats'), color: '#2196F3', route: '/stats' },
        { icon: 'settings-sharp', label: t('profile.appSettings'), color: '#78909C', route: '/settings' },
        { icon: 'help-circle', label: t('profile.supportHelp'), color: '#FFA000', route: '/support' },
        {
            icon: 'language', label: t('profile.langLabel'), color: '#673AB7', action: () => {
                Alert.alert(
                    t('profile.selectLanguage'),
                    t('profile.chooseLanguage'),
                    [
                        { text: 'English', onPress: () => changeLanguage('en') },
                        { text: 'Français', onPress: () => changeLanguage('fr') },
                        { text: 'العربية', onPress: () => changeLanguage('ar') },
                        { text: 'Cancel', style: 'cancel' }
                    ]
                );
            }
        },
        { icon: 'log-out', label: t('common.logout'), color: '#F44336', action: handleLogout },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Profile */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                        <TouchableOpacity style={styles.editBadge}>
                            <Ionicons name="camera" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{profile.name}</Text>
                    <Text style={styles.userEmail}>{profile.email}</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>{t('profile.crops')}</Text>
                        </View>
                        <View style={styles.statsDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{profile.location.split(',')[0]}</Text>
                            <Text style={styles.statLabel}>{t('profile.location')}</Text>
                        </View>
                        <View style={styles.statsDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>PRO</Text>
                            <Text style={styles.statLabel}>{t('profile.plan')}</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Section */}
                <View style={styles.menuContainer}>
                    {MENU_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => {
                                if ('action' in item && item.action) {
                                    item.action();
                                } else if ('route' in item && item.route) {
                                    router.push(item.route as any);
                                }
                            }}
                        >
                            <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                                <Ionicons name={item.icon as any} size={22} color={item.color} />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#CCC" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Pro Banner */}
                <LinearGradient
                    colors={['#4CAF50', '#2E7D32']}
                    style={styles.proBanner}
                >
                    <View style={styles.proContent}>
                        <MaterialCommunityIcons name="star-circle" size={40} color="#FFF" />
                        <View>
                            <Text style={styles.proTitle}>{t('profile.upgradeTitle')}</Text>
                            <Text style={styles.proSubtitle}>{t('profile.upgradeSub')}</Text>
                        </View>
                    </View>
                </LinearGradient>
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
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#F8F9FA',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    editBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#4CAF50',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E3333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#777',
        marginBottom: 25,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    statItem: {
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E3333',
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    statsDivider: {
        width: 1,
        height: 25,
        backgroundColor: '#EEE',
    },
    menuContainer: {
        padding: 25,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuIcon: {
        width: 45,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    proBanner: {
        margin: 25,
        borderRadius: 25,
        padding: 20,
        marginBottom: 110, // Account for navbar
    },
    proContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    proTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    proSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 13,
    },
});
