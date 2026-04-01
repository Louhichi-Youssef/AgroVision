import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FarmDetails {
    name: string;
    location: string;
    size: string;
}

export default function FarmDetailsScreen() {
    const { t } = useTranslation();
    const [farm, setFarm] = useState<FarmDetails>({
        name: '',
        location: '',
        size: '',
    });

    useEffect(() => {
        const loadFarm = async () => {
            try {
                const [name, location, size] = await Promise.all([
                    AsyncStorage.getItem('farm_name'),
                    AsyncStorage.getItem('farm_location'),
                    AsyncStorage.getItem('farm_size'),
                ]);

                setFarm({
                    name: name || '',
                    location: location || '',
                    size: size || '',
                });
            } catch (error) {
                console.error('Error loading farm details:', error);
            }
        };

        loadFarm();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: t('profile.myFarmDetails'), headerShown: true }} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.label}>{t('farm.namePlaceholder')}</Text>
                    <Text style={styles.value}>{farm.name || '—'}</Text>

                    <Text style={styles.label}>{t('farm.locationPlaceholder')}</Text>
                    <Text style={styles.value}>{farm.location || '—'}</Text>

                    <Text style={styles.label}>{t('farm.sizePlaceholder')}</Text>
                    <Text style={styles.value}>{farm.size ? `${farm.size}` : '—'}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    content: {
        padding: 20,
    },
    card: {
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    label: {
        fontSize: 13,
        color: '#777',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E3333',
        marginTop: 4,
    },
});
