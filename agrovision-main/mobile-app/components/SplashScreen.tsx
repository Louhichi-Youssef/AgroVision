import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
    onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.9);
    const textFadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 4,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(textFadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Hide splash after 3.5 seconds
        const timer = setTimeout(() => {
            if (onFinish) onFinish();
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/agrovision logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Animated.View style={{ opacity: textFadeAnim, alignItems: 'center' }}>
                    <Text style={styles.slogan}>Smarter farming powered by AI</Text>
                    <View style={styles.loadingBarContainer}>
                        <View style={styles.loadingBar} />
                    </View>
                </Animated.View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        width: width * 0.6,
        height: width * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    slogan: {
        color: '#2E3333',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1.2,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'System',
    },
    loadingBarContainer: {
        width: 150,
        height: 3,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginTop: 30,
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingBar: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4CAF50', // AgroVision Green
    },
});
