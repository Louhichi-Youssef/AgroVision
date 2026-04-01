import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function WeatherScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    const getWeatherInfo = (code: number) => {
        if (code === 0) return { condition: t('weather.conditions.clear'), icon: 'weather-sunny', color: '#FFB300' };
        if (code >= 1 && code <= 3) return { condition: t('weather.conditions.partlyCloudy'), icon: 'weather-partly-cloudy', color: '#90A4AE' };
        if (code === 45 || code === 48) return { condition: t('weather.conditions.foggy'), icon: 'weather-fog', color: '#B0BEC5' };
        if (code >= 51 && code <= 55) return { condition: t('weather.conditions.drizzle'), icon: 'weather-rainy', color: '#4FC3F7' };
        if (code >= 61 && code <= 65) return { condition: t('weather.conditions.rainy'), icon: 'weather-pouring', color: '#29B6F6' };
        if (code >= 80 && code <= 82) return { condition: t('weather.conditions.showers'), icon: 'weather-rainy', color: '#039BE5' };
        if (code === 95) return { condition: t('weather.conditions.thunderstorm'), icon: 'weather-lightning', color: '#5C6BC0' };
        return { condition: t('weather.conditions.unknown'), icon: 'weather-cloudy', color: '#999' };
    };

    const getDayName = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(i18n.language === 'ar' ? 'ar-TN' : i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [locationLabel, setLocationLabel] = useState<string>('');
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        requestLocationAndWeather();
    }, []);

    const requestLocationAndWeather = async () => {
        try {
            setLoading(true);
            setLocationError(null);

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                const msg = t('weather.locationPermissionDenied') || 'Location permission is required to show weather for your city.';
                setLocationError(msg);
                Alert.alert(t('weather.title'), msg);
                setLoading(false);
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});

            try {
                const places = await Location.reverseGeocodeAsync({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                });
                if (places && places.length > 0) {
                    const place = places[0];
                    const city = place.city || place.subregion || place.region;
                    const country = place.country || '';
                    const label = city ? `${city}${country ? ', ' + country : ''}` : country || '';
                    setLocationLabel(label || t('weather.location'));
                } else {
                    setLocationLabel(t('weather.location'));
                }
            } catch {
                setLocationLabel(t('weather.location'));
            }

            await fetchWeather(loc.coords.latitude, loc.coords.longitude);
        } catch (error) {
            console.error('Error getting location/weather:', error);
            const msg = t('weather.locationError') || 'Could not get your location.';
            setLocationError(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeather = async (latitude: number, longitude: number) => {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=auto`;
            const response = await fetch(url);
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    const currentInfo = weather ? getWeatherInfo(weather.current.weather_code) : { condition: t('weather.conditions.partlyCloudy'), icon: 'weather-cloudy', color: '#999' };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            {/* Premium Hero Header */}
            <LinearGradient
                colors={['#1A237E', '#283593', '#3949AB']}
                style={styles.heroHeader}
            >
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('weather.title')}</Text>
                    <TouchableOpacity style={styles.refreshBtn} onPress={requestLocationAndWeather}>
                        <Ionicons name="refresh" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#FFF" size="large" />
                    </View>
                ) : (
                    <View style={styles.heroContent}>
                        <View style={styles.locationContainer}>
                            <MaterialCommunityIcons name="map-marker" size={18} color="rgba(255,255,255,0.7)" />
                            <Text style={styles.locationText}>{locationLabel || t('weather.location')}</Text>
                        </View>

                        <View style={styles.mainTempRow}>
                            <MaterialCommunityIcons name={currentInfo.icon as any} size={80} color={currentInfo.color} style={styles.heroIcon} />
                            <View>
                                <Text style={styles.mainTemp}>{weather ? `${Math.round(weather.current.temperature_2m)}°` : '14°'}</Text>
                                <Text style={styles.conditionText}>{currentInfo.condition}</Text>
                            </View>
                        </View>

                        <View style={styles.currentStatsGrid}>
                            <View style={styles.statItem}>
                                <Ionicons name="water" size={20} color="#81D4FA" />
                                <Text style={styles.statValue}>{weather ? `${weather.current.relative_humidity_2m}%` : '--'}</Text>
                                <Text style={styles.statLabel}>{t('weather.humidity')}</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <FontAwesome5 name="wind" size={18} color="#90CAF9" />
                                <Text style={styles.statValue}>{weather ? `${weather.current.wind_speed_10m} km/h` : '--'}</Text>
                                <Text style={styles.statLabel}>{t('weather.windSpeed')}</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <MaterialCommunityIcons name="weather-sunny-alert" size={20} color="#FFE082" />
                                <Text style={styles.statValue}>{weather ? Math.round(weather.daily.uv_index_max[0]) : '--'}</Text>
                                <Text style={styles.statLabel}>{t('weather.uvIndex')}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Temp Forecast Bar Chart */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('weather.weeklyForecast')}</Text>
                    <View style={styles.chartContainer}>
                        {weather && weather.daily.time.slice(0, 7).map((time: string, index: number) => {
                            const maxTemp = weather.daily.temperature_2m_max[index];
                            const heightPercentage = (maxTemp / 40) * 100; // Assuming 40C is max
                            return (
                                <View key={index} style={styles.chartCol}>
                                    <Text style={styles.chartTemp}>{Math.round(maxTemp)}°</Text>
                                    <View style={[styles.chartBar, { height: `${heightPercentage}%` }]}>
                                        <LinearGradient
                                            colors={['#3949AB', '#81D4FA']}
                                            style={styles.barGradient}
                                        />
                                    </View>
                                    <Text style={styles.chartDay}>{new Date(time).toLocaleDateString(i18n.language === 'ar' ? 'ar-TN' : i18n.language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short' })}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* 7-Day List Redesign */}
                <View style={styles.section}>
                    <View style={styles.forecastList}>
                        {weather && weather.daily.time.map((time: string, index: number) => {
                            if (index === 0) return null;
                            const dayInfo = getWeatherInfo(weather.daily.weather_code[index]);
                            return (
                                <View key={index} style={styles.forecastCard}>
                                    <View style={styles.forecastDate}>
                                        <Text style={styles.dayText}>{getDayName(time).split(',')[0]}</Text>
                                        <Text style={styles.dateText}>{getDayName(time).split(',')[1]}</Text>
                                    </View>

                                    <View style={styles.forecastMain}>
                                        <MaterialCommunityIcons name={dayInfo.icon as any} size={28} color={dayInfo.color} />
                                        <Text style={styles.forecastCond}>{dayInfo.condition}</Text>
                                    </View>

                                    <View style={styles.forecastTemps}>
                                        <Text style={styles.maxT}>{Math.round(weather.daily.temperature_2m_max[index])}°</Text>
                                        <Text style={styles.minT}>{Math.round(weather.daily.temperature_2m_min[index])}°</Text>
                                    </View>

                                    <View style={styles.rainChance}>
                                        <Ionicons name="umbrella" size={14} color="#039BE5" />
                                        <Text style={styles.rainText}>{weather.daily.precipitation_probability_max[index]}%</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* AI Agricultural Insight */}
                <View style={[styles.section, { marginBottom: 60 }]}>
                    <LinearGradient
                        colors={['#2E7D32', '#43A047']}
                        style={styles.aiInsightBox}
                    >
                        <View style={styles.aiHeader}>
                            <MaterialCommunityIcons name="robot" size={24} color="#FFF" />
                            <Text style={styles.aiTitle}>{t('weather.agroBotWisdom')}</Text>
                        </View>
                        <Text style={styles.aiMessage}>
                            {weather && weather.current.wind_speed_10m < 15
                                ? t('weather.wisdom.gentle')
                                : t('weather.wisdom.strong')}
                        </Text>
                        <TouchableOpacity style={styles.aiAction} onPress={() => router.push('/chat')}>
                            <Text style={styles.aiActionText}>{t('weather.getDetailedPlan')}</Text>
                            <Ionicons name="arrow-forward" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F9',
    },
    heroHeader: {
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        elevation: 10,
        shadowColor: '#1A237E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    refreshBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    locationText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '600',
    },
    mainTempRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 30,
    },
    mainTemp: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#FFF',
    },
    conditionText: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        marginTop: -5,
    },
    heroIcon: {
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 10,
    },
    currentStatsGrid: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    statLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        marginTop: 2,
        textTransform: 'uppercase',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    scrollContent: {
        paddingTop: 20,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E3333',
        marginBottom: 15,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 25,
        height: 180,
        alignItems: 'flex-end',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    chartCol: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
        width: (width - 80) / 7,
    },
    chartTemp: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#3949AB',
        marginBottom: 5,
    },
    chartBar: {
        width: 8,
        backgroundColor: '#E8EAF6',
        borderRadius: 4,
        overflow: 'hidden',
        minHeight: 10,
    },
    barGradient: {
        flex: 1,
    },
    chartDay: {
        fontSize: 10,
        color: '#999',
        marginTop: 10,
    },
    forecastList: {
        gap: 12,
    },
    forecastCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    forecastDate: {
        width: 60,
    },
    dayText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    dateText: {
        fontSize: 10,
        color: '#999',
    },
    forecastMain: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    forecastCond: {
        fontSize: 13,
        color: '#555',
        fontWeight: '500',
    },
    forecastTemps: {
        width: 60,
        alignItems: 'flex-end',
    },
    maxT: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    minT: {
        fontSize: 12,
        color: '#999',
    },
    rainChance: {
        width: 45,
        alignItems: 'center',
        backgroundColor: '#E1F5FE',
        paddingVertical: 5,
        borderRadius: 10,
        marginLeft: 10,
    },
    rainText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#0288D1',
        marginTop: 2,
    },
    aiInsightBox: {
        padding: 20,
        borderRadius: 25,
        elevation: 4,
        shadowColor: '#2E7D32',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    aiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    aiTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    aiMessage: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
    },
    aiAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    aiActionText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
