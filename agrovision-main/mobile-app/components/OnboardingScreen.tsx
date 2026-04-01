import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
    onGetStarted: () => void;
    onSignIn: () => void;
}

export default function OnboardingScreen({ onGetStarted, onSignIn }: OnboardingScreenProps) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/agrovision logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={onSignIn}>
                        <Text style={styles.signInButton}>{t('onboarding.signIn')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{t('onboarding.title')}</Text>
                    <Text style={styles.slogan}>{t('onboarding.slogan')}</Text>
                    <Text style={styles.description}>
                        {t('onboarding.description')}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
                        <Text style={styles.getStartedText}>{t('onboarding.getStarted')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    logo: {
        marginTop: 0,
        marginLeft: -40,
        width: 120,
        height: 60,
    },
    signInButton: {
        color: '#4CAF50', // AgroVision Green for visibility on white
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        color: '#2E3333',
        fontSize: 42,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 10,
    },
    slogan: {
        color: '#4CAF50', // AgroVision Green
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        color: '#555555',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 26,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    getStartedButton: {
        backgroundColor: '#4CAF50', // AgroVision Green
        paddingVertical: 18,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    getStartedText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
});
