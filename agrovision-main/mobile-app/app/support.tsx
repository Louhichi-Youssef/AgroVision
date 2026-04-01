import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: t('profile.supportHelp'), headerShown: true }} />
            <View style={styles.content}>
                <Ionicons name="help-buoy" size={80} color="#FFA000" />
                <Text style={styles.title}>{t('profile.supportHelp')}</Text>
                <Text style={styles.subtitle}>{t('profile.supportSub')}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 20 },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10 },
});
