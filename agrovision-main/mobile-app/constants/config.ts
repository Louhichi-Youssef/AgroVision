/**
 * Centralized API configuration for the mobile app.
 * Uses environment variables with a fallback to the last known working IP.
 */

const DEFAULT_IP = '192.168.1.167'; // Current local IP
const DEFAULT_PORT = '5000';

// process.env.EXPO_PUBLIC_API_URL is automatically populated by Expo from .env
const ENV_API_URL = process.env.EXPO_PUBLIC_API_URL;

export const BASE_URL = ENV_API_URL
    ? ENV_API_URL.replace('/api', '')
    : `http://${DEFAULT_IP}:${DEFAULT_PORT}`;

export const API_URL = `${BASE_URL}/api`;

console.log(`[Config] API URL: ${API_URL}`);
