import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GoalsScreenProps {
    onFinish: () => void;
    onBack: () => void;
}

const ALL_GOALS = [
    { id: 'yield', title: 'Increase Crop Yield', icon: '📈' },
    { id: 'water', title: 'Reduce Water Use', icon: '💧' },
    { id: 'soil', title: 'Monitor Soil Health', icon: '🌱' },
    { id: 'pest', title: 'Pest & Disease Alerts', icon: '⚠️' },
    { id: 'costs', title: 'Optimize Input Costs', icon: '💰' },
    { id: 'weather', title: 'Localized Weather Insights', icon: '🌦️' },
];

export default function GoalsScreen({ onFinish, onBack }: GoalsScreenProps) {
    const { t } = useTranslation();
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const toggleGoal = (id: string) => {
        if (selectedGoals.includes(id)) {
            setSelectedGoals(selectedGoals.filter(goalId => goalId !== id));
        } else {
            setSelectedGoals([...selectedGoals, id]);
        }
    };

    const handleFinish = async () => {
        try {
            await AsyncStorage.setItem('has_onboarded', 'true');
            onFinish();
        } catch (error) {
            console.error('Error saving onboarding state:', error);
            onFinish();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
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
                    <Text style={styles.stepIndicator}>{t('goals.stepIndicator')}</Text>
                    <Text style={styles.title}>{t('goals.title')}</Text>
                    <Text style={styles.subtitle}>
                        {t('goals.subtitle')}
                    </Text>

                    <View style={styles.goalsGrid}>
                        {ALL_GOALS.map((goal) => {
                            const isSelected = selectedGoals.includes(goal.id);
                            return (
                                <TouchableOpacity
                                    key={goal.id}
                                    style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                                    onPress={() => toggleGoal(goal.id)}
                                >
                                    <Text style={styles.goalIcon}>{goal.icon}</Text>
                                    <Text style={[styles.goalTitle, isSelected && styles.goalTitleSelected]}>
                                        {t(`goals.items.${goal.id}`)}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.finishButton, selectedGoals.length === 0 && styles.finishButtonDisabled]}
                    onPress={handleFinish}
                    disabled={selectedGoals.length === 0}
                >
                    <Text style={styles.finishButtonText}>{t('goals.finish')}</Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: 20,
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
    goalsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    goalCard: {
        width: '47%',
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
    },
    goalCardSelected: {
        borderColor: '#4CAF50',
        backgroundColor: '#E8F5E9',
    },
    goalIcon: {
        fontSize: 32,
        marginBottom: 10,
    },
    goalTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        textAlign: 'center',
    },
    goalTitleSelected: {
        color: '#4CAF50',
    },
    footer: {
        paddingHorizontal: 25,
        paddingBottom: 40,
        paddingTop: 10,
    },
    finishButton: {
        backgroundColor: '#4CAF50', // AgroVision Green
        paddingVertical: 18,
        borderRadius: 4,
        alignItems: 'center',
        elevation: 2,
    },
    finishButtonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    finishButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.2,
    },
});
