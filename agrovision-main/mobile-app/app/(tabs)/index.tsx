import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/config';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    loadUserData();
    fetchWeather();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('user_name');
      if (name) setUserName(name);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${API_URL}/weather`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  interface Crop {
    id: string;
    name: string;
    health: number;
    stage: string;
    imagePath: string;
  }

  const crops: Crop[] = [

  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header with Search & Notif */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>{t('home.greeting')}</Text>
            <Text style={styles.userName}>{userName || 'User'}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/marketplace')}>
              <Ionicons name="search" size={22} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/profile')}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Plant Doctor / Disease Diagnosis */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#E8F5E9', '#F1F8E9']}
            style={styles.doctorCard}
          >
            <View style={styles.doctorContent}>
              <View style={styles.doctorTextContainer}>
                <Text style={styles.doctorTitle}>{t('home.plantDoctor')}</Text>
                <Text style={styles.doctorSubtitle}>{t('home.plantDoctorSub')}</Text>
                <TouchableOpacity
                  style={styles.cameraBtn}
                  activeOpacity={0.8}
                  onPress={() => router.push('/diagnosis')}
                >
                  <MaterialCommunityIcons name="camera-iris" size={20} color="#FFF" />
                  <Text style={styles.cameraBtnText}>{t('home.diagnoseNow')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.doctorIconCircle}>
                <MaterialCommunityIcons name="camera-iris" size={50} color="#4CAF50" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* AI Assistant Banner - Linked to Chat */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/chat')}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiBanner}
          >
            <View style={styles.aiContent}>
              <View>
                <Text style={styles.aiTitle}>{t('home.askAgroBot')}</Text>
                <Text style={styles.aiSubtitle}>{t('home.agroBotSub')}</Text>
              </View>
              <View style={styles.aiIconCircle}>
                <Ionicons name="chatbubble-ellipses" size={28} color="#4CAF50" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Status Hub: Weather & Irrigation Side-by-Side */}
        <View style={styles.statusHub}>
          <TouchableOpacity
            style={[styles.statusCard, styles.weatherCard]}
            onPress={() => router.push('/weather')}
            activeOpacity={0.8}
          >
            <View style={styles.widgetHeader}>
              <MaterialCommunityIcons name="weather-partly-cloudy" size={22} color="#FFA000" />
              <Text style={styles.widgetTitle}>{t('home.meteo')}</Text>
            </View>
            <View style={styles.weatherInfo}>
              <Text style={styles.tempValue}>{weather ? `${Math.round(weather.current.temperature_2m)}°C` : '14°C'}</Text>
              <Text style={styles.weatherCondition}>
                {weather ? (weather.current.is_day ? t('weather.conditions.daytime') : t('weather.conditions.nighttime')) : t('weather.conditions.sunny')}
              </Text>
              <View style={styles.subWeatherRow}>
                <View style={styles.subWeatherItem}>
                  <Ionicons name="water" size={12} color="#2196F3" />
                  <Text style={styles.subWeatherText}>{weather ? `${weather.current.relative_humidity_2m}%` : '45%'}</Text>
                </View>
                <View style={styles.subWeatherItem}>
                  <FontAwesome5 name="wind" size={10} color="#78909C" />
                  <Text style={styles.subWeatherText}>{weather ? `${weather.current.wind_speed_10m}km/h` : '12km/h'}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.statusCard, styles.irrigationCard]}>
            <View style={styles.widgetHeader}>
              <MaterialCommunityIcons name="water-pump" size={22} color="#2196F3" />
              <Text style={styles.widgetTitle}>{t('home.irrigation')}</Text>
            </View>
            <View style={styles.predictionContent}>
              <Text style={styles.predictionLabel}>{t('home.nextCycle')}</Text>
              <Text style={styles.predictionValue}>{t('common.tomorrow')}</Text>
              <Text style={styles.predictionTime}>05:00 AM</Text>
              <View style={styles.irrigationProgress}>
                <View style={[styles.progressBar, { width: '75%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Dynamic My Crops Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.myCrops')}</Text>
            <TouchableOpacity><Text style={styles.seeAll}>{t('common.details')}</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cropsScrollContainer}>
            {/* Add New Crop Button */}
            <TouchableOpacity
              style={styles.addCropCard}
              onPress={() => router.push('/diagnosis')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#F5F5F5', '#E0E0E0']}
                style={styles.addCropGradient}
              >
                <Ionicons name="add" size={40} color="#4CAF50" />
                <Text style={styles.addCropText}>{t('home.addCrop')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {crops.length === 0 ? (
              <View style={styles.emptyCropsContainer}>
                <View style={styles.emptyIconCircle}>
                  <MaterialCommunityIcons name="sprout-outline" size={36} color="#4CAF50" />
                </View>
                <Text style={styles.emptyCropsTitle}>{t('home.noCrops')}</Text>
                <Text style={styles.emptyCropsSub}>{t('home.noCropsSub')}</Text>
              </View>
            ) : (
              crops.map((item: any) => (
                <TouchableOpacity key={item.id} activeOpacity={0.9} style={styles.card}>
                  <Image source={{ uri: item.imagePath }} style={styles.cardImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.cardGradient}
                  >
                    <View style={styles.cardContent}>
                      <View style={styles.cardTopRow}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <View style={[styles.healthBadge, { backgroundColor: item.health > 85 ? '#4CAF50' : '#FFC107' }]}>
                          <Text style={styles.healthText}>{item.health}%</Text>
                        </View>
                      </View>
                      <Text style={styles.cardDesc}>{item.stage}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* Disease Alerts Shortcut */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.recentAnalytics')}</Text>
          </View>
          <TouchableOpacity style={styles.analyticsBox}>
            <View style={styles.analyticsRow}>
              <View style={styles.analyticsItem}>
                <View style={[styles.alertCircle, { backgroundColor: '#FFEBEE' }]}>
                  <MaterialCommunityIcons name="alert-decagram" size={24} color="#F44336" />
                </View>
                <Text style={styles.analyticsValue}>3</Text>
                <Text style={styles.analyticsLabel}>{t('home.alerts')}</Text>
              </View>
              <View style={styles.analyticsDivider} />
              <View style={styles.analyticsItem}>
                <View style={[styles.alertCircle, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialCommunityIcons name="history" size={24} color="#2196F3" />
                </View>
                <Text style={styles.analyticsValue}>12</Text>
                <Text style={styles.analyticsLabel}>{t('home.history')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  greeting: {
    fontSize: 16,
    color: '#777',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3333',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: '#F44336',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  doctorCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  doctorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorTextContainer: {
    flex: 1,
  },
  doctorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  doctorSubtitle: {
    fontSize: 14,
    color: '#4E6E4E',
    marginBottom: 15,
  },
  doctorIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cameraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
    elevation: 3,
  },
  cameraBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  aiBanner: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 5,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  aiContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  aiSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    maxWidth: width * 0.6,
  },
  aiIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusHub: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  statusCard: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
  },
  weatherCard: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFECB3',
  },
  irrigationCard: {
    backgroundColor: '#E3F2FD',
    borderColor: '#BBDEFB',
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  widgetTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  weatherInfo: {
    alignItems: 'center',
  },
  tempValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3333',
  },
  weatherCondition: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  subWeatherRow: {
    flexDirection: 'row',
    gap: 10,
  },
  subWeatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subWeatherText: {
    fontSize: 10,
    color: '#777',
    fontWeight: '600',
  },
  predictionContent: {
    alignItems: 'flex-start',
  },
  predictionLabel: {
    fontSize: 10,
    color: '#546E7A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  predictionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  predictionTime: {
    fontSize: 12,
    color: '#1976D2',
    marginBottom: 8,
  },
  irrigationProgress: {
    height: 4,
    width: '100%',
    backgroundColor: '#CFD8DC',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3333',
  },
  seeAll: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  card: {
    width: width * 0.65,
    height: 180,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  addCropCard: {
    width: 140,
    height: 180,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EEE',
    borderStyle: 'dashed',
  },
  addCropGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addCropText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cropsScrollContainer: {
    paddingRight: 20,
  },
  emptyCropsContainer: {
    width: 180,
    height: 180,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
  },
  emptyIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  emptyCropsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  emptyCropsSub: {
    fontSize: 10,
    color: '#777',
    textAlign: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  cardContent: {
    gap: 5,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  healthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  healthText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
  },
  analyticsBox: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  analyticsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  analyticsItem: {
    alignItems: 'center',
    gap: 5,
  },
  alertCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  analyticsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E3333',
  },
  analyticsLabel: {
    fontSize: 12,
    color: '#777',
  },
  analyticsDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#EEE',
  },
});
