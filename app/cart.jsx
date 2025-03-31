import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function CartPage() {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { cartItems, restaurantId, updateCart } = route.params;
  const [cart, setCart] = useState(cartItems || []);

  const findExistingItemIndex = (cartArray, item) => {
    return cartArray.findIndex(cartItem => {
      const sameCustomIngredients = cartItem.customIngredients.length === item.customIngredients.length &&
        cartItem.customIngredients.every(ci => 
          item.customIngredients.some(newCi => 
            newCi.qid === ci.qid && newCi.selectedQuantity === ci.selectedQuantity
          )
        );
      
      return cartItem.dish_id === item.dish_id && sameCustomIngredients;
    });
  };

  const addToCart = (item) => {
    const existingItemIndex = findExistingItemIndex(cart, item);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      updateCart(updatedCart);
    } else {
      const newCart = [...cart, { ...item, quantity: 1 }];
      setCart(newCart);
      updateCart(newCart);
    }
  };

  const removeFromCart = (item) => {
    const existingItemIndex = findExistingItemIndex(cart, item);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
      updateCart(updatedCart);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    navigation.navigate('Checkout', {
      cartItems: cart,
      restaurantId: restaurantId,
      totalAmount: calculateSubtotal()
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
      </View>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={100} color="#cccccc" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.backToMenuButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backToMenuButtonText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView 
            style={styles.cartItemsContainer}
            showsVerticalScrollIndicator={false}
          >
            {cart.map((item) => (
              <View key={`${item.dish_id}-${item.customIngredients.map(ing => `${ing.qid}-${ing.selectedQuantity}`).join('-')}`} style={styles.cartItemCard}>
                <View style={styles.cartItemContent}>
                  <View style={styles.cartItemTextContainer}>
                    <Text style={styles.cartItemName}>{item.dish_name}</Text>
                    {item.customIngredients && item.customIngredients.length > 0 && (
                      <Text style={styles.customIngredientsText}>
                        {item.customIngredients.map(ing => 
                          `${ing.ingredient} x${ing.selectedQuantity}`
                        ).join(', ')}
                      </Text>
                    )}
                    <Text style={styles.cartItemPrice}>₹{item.totalPrice.toFixed(2)}</Text>
                  </View>
                  
                  <View style={styles.quantityControl}>
                    <View style={styles.quantityControlButtons}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => removeFromCart(item)}
                      >
                        <Ionicons name="remove" size={20} color="#fff" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => addToCart(item)}
                      >
                        <Ionicons name="add" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Order Summary */}
          <View style={styles.orderSummaryContainer}>
            <View style={styles.orderSummaryRow}>
              <Text style={styles.orderSummaryLabel}>Total Items</Text>
              <Text style={styles.orderSummaryValue}>{calculateTotalItems()}</Text>
            </View>
            <View style={styles.orderSummaryRow}>
              <Text style={styles.orderSummaryLabel}>Subtotal</Text>
              <Text style={styles.orderSummaryValue}>₹{calculateSubtotal().toFixed(2)}</Text>
            </View>
            <View style={styles.orderSummaryRow}>
              <Text style={styles.orderSummaryLabel}>Taxes & Charges</Text>
              <Text style={styles.orderSummaryValue}>₹0</Text>
            </View>
            <View style={styles.orderSummaryTotalRow}>
              <Text style={styles.orderSummaryTotalLabel}>Total</Text>
              <Text style={styles.orderSummaryTotalValue}>₹{calculateSubtotal().toFixed(2)}</Text>
            </View>
          </View>

          {/* Proceed to Checkout */}
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={handleProceedToCheckout}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Text style={styles.checkoutButtonSubtext}>₹{calculateSubtotal().toFixed(2)}</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  customIngredientsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    elevation: 2
  },
  backButton: {
    marginRight: 15
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  cartItemsContainer: {
    flex: 1,
    paddingHorizontal: 15
  },
  cartItemCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2
  },
  cartItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  cartItemTextContainer: {
    flex: 1
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  cartItemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#28a745'
  },
  quantityControl: {
    alignItems: 'center'
  },
  quantityControlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 5,
    overflow: 'hidden'
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#28a745'
  },
  quantityText: {
    paddingHorizontal: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  orderSummaryContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  orderSummaryLabel: {
    fontSize: 15,
    color: '#666'
  },
  orderSummaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333'
  },
  orderSummaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10
  },
  orderSummaryTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  orderSummaryTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745'
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkoutButtonSubtext: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15
  },
  backToMenuButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15
  },
  backToMenuButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});