import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FarmProfileScreenProps {
    onNext: () => void;
    onBack: () => void;
}

export default function FarmProfileScreen({ onNext, onBack }: FarmProfileScreenProps) {
    const { t } = useTranslation();
    const [farmName, setFarmName] = useState('');
    const [location, setLocation] = useState('');
    const [farmSize, setFarmSize] = useState('');

    const canContinue = farmName.trim().length > 0 && location.trim().length > 0 && farmSize.trim().length > 0;

    const handleNext = async () => {
        try {
            await AsyncStorage.setItem('farm_name', farmName);
            await AsyncStorage.setItem('farm_location', location);
            await AsyncStorage.setItem('farm_size', farmSize);
            onNext();
        } catch (error) {
            console.error('Error saving farm data:', error);
            onNext();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}>
                        <Image
                            source={require('../assets/images/agrovision logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.stepIndicator}>{t('farm.stepIndicator')}</Text>
                        <Text style={styles.title}>{t('farm.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('farm.subtitle')}
                        </Text>

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('farm.namePlaceholder')}
                                    placeholderTextColor="#999"
                                    value={farmName}
                                    onChangeText={setFarmName}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('farm.locationPlaceholder')}
                                    placeholderTextColor="#999"
                                    value={location}
                                    onChangeText={setLocation}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('farm.sizePlaceholder')}
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    value={farmSize}
                                    onChangeText={setFarmSize}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
                                onPress={handleNext}
                                disabled={!canContinue}
                            >
                                <Text style={styles.nextButtonText}>{t('common.save')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        height: 80,
    },
    logo: {
        marginTop: 0,
        marginLeft: -40,
        width: 120,
        height: 60,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    content: {
        paddingTop: 20,
    },
    stepIndicator: {
        fontSize: 13,
        fontWeight: '600',
        color: '#777',
        letterSpacing: 1,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2E3333',
        lineHeight: 34,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        lineHeight: 24,
        marginBottom: 30,
    },
    form: {
        gap: 15,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
        backgroundColor: '#F9F9F9',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
    },
    nextButton: {
        backgroundColor: '#4CAF50', // AgroVision Green
        paddingVertical: 18,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
    },
    nextButtonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.2,
    },
});
