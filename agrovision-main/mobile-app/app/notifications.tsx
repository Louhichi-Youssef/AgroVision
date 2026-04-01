import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Irrigation Alert',
        message: 'High heat forecast for tomorrow. Consider increasing water cycle by 15%.',
        type: 'irrigation',
        time: '2h ago',
        read: false,
    },
    {
        id: '2',
        title: 'Pest Warning',
        message: 'Olive Fly detected in nearby farms in the Sfax region. Check your traps.',
        type: 'alert',
        time: '5h ago',
        read: false,
    },
    {
        id: '3',
        title: 'Market Update',
        message: 'Organic fertilizer prices have dropped by 10%. Check the marketplace.',
        type: 'market',
        time: '1d ago',
        read: true,
    },
];

export default function NotificationsScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const renderIcon = (type: string) => {
        switch (type) {
            case 'irrigation': return <MaterialCommunityIcons name="water-pump" size={24} color="#2196F3" />;
            case 'alert': return <MaterialCommunityIcons name="alert-decagram" size={24} color="#F44336" />;
            case 'market': return <Ionicons name="cart" size={24} color="#4CAF50" />;
            default: return <Ionicons name="notifications" size={24} color="#777" />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>{t('notifications.title')}</Text>
                <TouchableOpacity>
                    <Text style={styles.clearAll}>{t('common.cancel')}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={NOTIFICATIONS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.card, !item.read && styles.unreadCard]}>
                        <View style={styles.iconContainer}>
                            {renderIcon(item.type)}
                        </View>
                        <View style={styles.content}>
                            <View style={styles.row}>
                                <Text style={styles.notifTitle}>{item.title}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                        </View>
                        {!item.read && <View style={styles.unreadDot} />}
                    </TouchableOpacity>
                )}
            />
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backBtn: {
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E3333',
    },
    clearAll: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 16,
        backgroundColor: '#FFF',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        alignItems: 'center',
    },
    unreadCard: {
        backgroundColor: '#F9FFF9',
        borderColor: '#E8F5E9',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    content: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    notifTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    message: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginLeft: 10,
    },
});
