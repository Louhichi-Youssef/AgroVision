import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/constants/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/use-color-scheme';
import SplashScreen from '@/components/SplashScreen';
import OnboardingScreen from '@/components/OnboardingScreen';
import SignUpScreen from '@/components/SignUpScreen';
import FarmProfileScreen from '@/components/FarmProfileScreen';
import GoalsScreen from '@/components/GoalsScreen';
import { CartProvider } from '@/hooks/CartContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isFarmProfileVisible, setIsFarmProfileVisible] = useState(false);
  const [isGoalsVisible, setIsGoalsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Hide the native splash screen
        await ExpoSplashScreen.hideAsync();

        // Check if user has already onboarded/logged in
        const userName = await AsyncStorage.getItem('user_name');
        if (userName) {
          // If we have a user name, they have logged in before, skip onboarding
          setIsSplashVisible(false);
          setIsReady(true);
        } else {
          setIsReady(true);
        }
      } catch (e) {
        console.warn(e);
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {isSplashVisible ? (
            <SplashScreen
              onFinish={() => {
                setIsSplashVisible(false);
                setIsOnboardingVisible(true);
              }}
            />
          ) : isOnboardingVisible ? (
            <OnboardingScreen
              onGetStarted={() => {
                setIsOnboardingVisible(false);
                setIsSignUpVisible(true);
              }}
              onSignIn={() => setIsOnboardingVisible(false)}
            />
          ) : isSignUpVisible ? (
            <SignUpScreen
              onNext={() => {
                setIsSignUpVisible(false);
                setIsFarmProfileVisible(true);
              }}
              onBack={() => {
                setIsSignUpVisible(false);
                setIsOnboardingVisible(true);
              }}
            />
          ) : isFarmProfileVisible ? (
            <FarmProfileScreen
              onNext={() => {
                setIsFarmProfileVisible(false);
                setIsGoalsVisible(true);
              }}
              onBack={() => {
                setIsFarmProfileVisible(false);
                setIsSignUpVisible(true);
              }}
            />
          ) : isGoalsVisible ? (
            <GoalsScreen
              onFinish={() => setIsGoalsVisible(false)}
              onBack={() => {
                setIsGoalsVisible(false);
                setIsFarmProfileVisible(true);
              }}
            />
          ) : (
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="notifications" options={{ presentation: 'modal', title: 'Notifications' }} />
              <Stack.Screen name="diagnosis" options={{ headerShown: false }} />
              <Stack.Screen name="weather" options={{ headerShown: false }} />
              <Stack.Screen name="cart" options={{ title: 'Cart' }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          )}
          <StatusBar style="auto" />
        </ThemeProvider>
      </CartProvider>
    </I18nextProvider>
  );
}
