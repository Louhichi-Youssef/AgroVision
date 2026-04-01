import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    const changeLanguage = async (lng: string) => {
        await i18n.changeLanguage(lng);
        await AsyncStorage.setItem('user-language', lng);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: t('common.settings'), headerShown: true }} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>{t('common.language')}</Text>
                <View style={styles.card}>
                    {['en', 'fr', 'ar'].map((lang) => (
                        <TouchableOpacity
                            key={lang}
                            style={[styles.item, i18n.language === lang && styles.activeItem]}
                            onPress={() => changeLanguage(lang)}
                        >
                            <Text style={[styles.itemText, i18n.language === lang && styles.activeItemText]}>
                                {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'العربية'}
                            </Text>
                            {i18n.language === lang && <Ionicons name="checkmark" size={20} color="#4CAF50" />}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    content: { padding: 20 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#666', marginBottom: 10, marginLeft: 5 },
    card: { backgroundColor: '#FFF', borderRadius: 15, overflow: 'hidden' },
    item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    itemText: { fontSize: 16, color: '#333' },
    activeItem: { backgroundColor: '#E8F5E9' },
    activeItemText: { color: '#4CAF50', fontWeight: 'bold' },
});
