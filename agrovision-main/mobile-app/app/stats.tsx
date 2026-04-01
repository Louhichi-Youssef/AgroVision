import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StatsScreen() {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: t('profile.harvestStats'), headerShown: true }} />
            <View style={styles.content}>
                <MaterialCommunityIcons name="chart-areaspline" size={80} color="#4CAF50" />
                <Text style={styles.title}>{t('profile.harvestStats')}</Text>
                <Text style={styles.subtitle}>{t('profile.statsSub')}</Text>
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
