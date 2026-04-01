import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function DiagnosisResultScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const cameraRef = useRef<CameraView | null>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [isRequesting, setIsRequesting] = useState(false);
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    useEffect(() => {
        const ensurePermission = async () => {
            if (!permission || !permission.granted) {
                setIsRequesting(true);
                try {
                    await requestPermission();
                } finally {
                    setIsRequesting(false);
                }
            }
        };

        ensurePermission();
    }, [permission, requestPermission]);

    // While permission is loading / being requested
    if (!permission || isRequesting) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <StatusBar style="light" />
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={styles.loadingText}>{t('diagnosis.requestingCamera') || 'Requesting camera permission...'}</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Permission denied
    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <StatusBar style="light" />
                <View style={styles.loadingContent}>
                    <MaterialCommunityIcons name="camera-off" size={42} color="#F44336" />
                    <Text style={styles.loadingText}>{t('diagnosis.cameraDenied') || 'Camera access is required to diagnose your plant.'}</Text>
                    <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
                        <Text style={styles.permissionBtnText}>{t('diagnosis.enableCamera') || 'Enable Camera'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backPlainBtn} onPress={() => router.back()}>
                        <Text style={styles.backPlainBtnText}>{t('common.back') || 'Back'}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.cameraFull}>
                <CameraView
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    facing="back"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    loadingContent: {
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
    },
    permissionBtn: {
        marginTop: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#4CAF50',
    },
    permissionBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    backPlainBtn: {
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    backPlainBtnText: {
        color: '#FFF',
        fontSize: 14,
    },
    cameraFull: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
});
