import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/hooks/CartContext';
import { useTranslation } from 'react-i18next';

export default function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { t } = useTranslation();
  const router = useRouter();

  const total = cart.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
    return sum + numericPrice * item.quantity;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: t('marketplace.cartTitle') || 'My Cart' }} />
      <ScrollView contentContainerStyle={styles.content}>
        {cart.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cart-outline" size={60} color="#CCC" />
            <Text style={styles.emptyTitle}>{t('marketplace.cartEmptyTitle') || 'Your cart is empty'}</Text>
            <Text style={styles.emptySubtitle}>
              {t('marketplace.cartEmptySub') || 'Add products from the marketplace to start your order.'}
            </Text>
          </View>
        ) : (
          <>
            {cart.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <Text style={styles.itemQty}>{t('marketplace.quantity') || 'Qty'}: {item.quantity}</Text>
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('marketplace.total') || 'Total'}</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} DT</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              // For now, simulate payment success and clear cart
              clearCart();
              router.back();
            }}
          >
            <Text style={styles.checkoutText}>{t('marketplace.checkout') || 'Pay & Complete Order'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemQty: {
    marginTop: 2,
    fontSize: 12,
    color: '#777',
  },
  removeBtn: {
    padding: 8,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  checkoutBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

