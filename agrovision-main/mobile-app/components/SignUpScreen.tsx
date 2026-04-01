import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpScreenProps {
    onNext: () => void;
    onBack: () => void;
}

export default function SignUpScreen({ onNext, onBack }: SignUpScreenProps) {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const getPasswordStrength = () => {
        if (password.length === 0) return { label: '', color: 'transparent', score: 0 };
        if (password.length < 6) return { label: t('signup.weak'), color: '#F44336', score: 1 };

        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score < 2) return { label: t('signup.fair'), color: '#FF9800', score: 2 };
        return { label: t('signup.strong'), color: '#4CAF50', score: 3 };
    };

    const strength = getPasswordStrength();
    const isPasswordMatch = password === confirmPassword && password.length > 0;
    const canRegister = name && email && strength.score >= 2 && isPasswordMatch;

    const handleNext = async () => {
        try {
            await AsyncStorage.setItem('user_name', name);
            await AsyncStorage.setItem('user_email', email);
            onNext();
        } catch (error) {
            console.error('Error saving user data:', error);
            onNext(); // Proceed anyway but log error
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
                    <TouchableOpacity onPress={onBack}>
                        <Text style={styles.signInLink}>{t('onboarding.signIn')}</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.stepIndicator}>{t('signup.stepIndicator')}</Text>
                        <Text style={styles.title}>{t('signup.title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('signup.subtitle')}
                        </Text>

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('signup.fullName')}
                                    placeholderTextColor="#999"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('signup.email')}
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('signup.password')}
                                    placeholderTextColor="#999"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            {/* Password Strength Indicator */}
                            {password.length > 0 && (
                                <View style={styles.strengthContainer}>
                                    <View style={styles.strengthBarContainer}>
                                        <View style={[styles.strengthBar, { width: `${(strength.score / 3) * 100}%`, backgroundColor: strength.color }]} />
                                    </View>
                                    <Text style={[styles.strengthText, { color: strength.color }]}>
                                        {t('signup.passwordStrength')}: {strength.label}
                                    </Text>
                                </View>
                            )}

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('signup.confirmPassword')}
                                    placeholderTextColor="#999"
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>

                            {confirmPassword.length > 0 && !isPasswordMatch && (
                                <Text style={styles.errorText}>{t('signup.passwordsDoNotMatch')}</Text>
                            )}

                            <TouchableOpacity
                                style={[styles.nextButton, !canRegister && styles.nextButtonDisabled]}
                                onPress={handleNext}
                                disabled={!canRegister}
                            >
                                <Text style={styles.nextButtonText}>{t('signup.next')}</Text>
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
        justifyContent: 'space-between',
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
    signInLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E3333',
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
    strengthContainer: {
        marginTop: -5,
        marginBottom: 5,
    },
    strengthBarContainer: {
        height: 4,
        backgroundColor: '#EEE',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 5,
    },
    strengthBar: {
        height: '100%',
    },
    strengthText: {
        fontSize: 12,
        fontWeight: '600',
    },
    errorText: {
        color: '#F44336',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 5,
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
        backgroundColor: '#A5D6A7', // Lighter green for disabled state
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.2,
    },
});
