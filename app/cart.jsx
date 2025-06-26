import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import MapScreen from './MapScreen';
import { supabase } from '../components/supabase/supabase';

export default function CartPage() {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { cartItems: initialCartItems, restaurantId, updateCart } = route.params;
  const [cart, setCart] = useState(initialCartItems || []);
  
  // Checkout state
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const { user_id } = route.params || {};
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Update address when it comes from MapScreen and preserve cart items
  useEffect(() => {
    if (route.params?.address) {
      console.log("Address received from map:", route.params.address);
      setAddress(route.params.address);
    }
    
    // Preserve cart items when returning from MapScreen
    if (route.params?.cartItems) {
      console.log("Cart items preserved after map navigation:", route.params.cartItems);
      setCart(route.params.cartItems);
    }
    
    // Automatically open checkout modal if requested
    if (route.params?.openCheckoutModal) {
      setCheckoutModalVisible(true);
    }
  }, [route.params?.address, route.params?.cartItems, route.params?.openCheckoutModal]);

  // We can also use useFocusEffect to ensure the state is updated when returning from MapScreen
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.address) {
        setAddress(route.params.address);
      }
      
      // Make sure cart state is preserved when the screen regains focus
      if (route.params?.cartItems) {
        setCart(route.params.cartItems);
      }
      
      // Automatically open checkout modal if requested
      if (route.params?.openCheckoutModal) {
        setCheckoutModalVisible(true);
      }
    }, [route.params?.address, route.params?.cartItems, route.params?.openCheckoutModal])
  );
  
  // Rest of your CartPage code remains the same

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
    setCheckoutModalVisible(true);
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
        Alert.alert('Error', 'Please enter your delivery address');
        return;
    }
    if (!user_id) {
        Alert.alert('Error', 'User ID is missing. Please log in again.');
        return;
    }

    setLoading(true);
    const generatedOrderId = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderId(generatedOrderId);
    console.log("Generated Order ID:", generatedOrderId);

    try {
        // Prepare the order data
        const orderData = {
            order_id: generatedOrderId,
            user_id: user_id,
            res_id: restaurantId,
            price: calculateSubtotal(),
            status: 'pending',
            order_time: new Date().toISOString(),
            address: address,
        };

        // Insert the order into the 'orders' table in Supabase
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData])
            .single();

        if (error) {
            throw new Error(error.message);
        }

        // If insertion is successful
        setLoading(false);
        setOrderPlaced(true);
        setCart([]);
        updateCart([]);

        Alert.alert('Success', `Order placed successfully! Your order ID is ${generatedOrderId}`);

        // Fetch order details after placing the order
        await getData(generatedOrderId);
    } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Failed to place order. Please try again.');
        console.error('Order placement error:', error);
    }
  };

  const getData = async (orderId) => {
    if (!orderId) {
        console.error("Order ID is not set.");
        return;
    }

    console.log("Fetching data for order ID:", orderId);

    const { data, error } = await supabase
        .from("orders")
        .select("order_id, user_id, address, res_id, price")
        .eq("order_id", orderId)
        .single();

    if (error) {
        console.error("Supabase Fetch Error:", error);
        Alert.alert("Error", "Failed to retrieve order details. Try again.");
        return;
    }

    setDetail(data);
  };

  const handleContinueShopping = () => {
    setOrderPlaced(false);
    setCheckoutModalVisible(false);
    navigation.goBack();
  };

  // UPDATED: Function now includes openCheckoutModal flag
  const handleMapSelection = () => {
    // Navigate to the map screen and pass all current state to preserve context
    navigation.navigate('MapScreen', {
      cartItems: cart,
      restaurantId: restaurantId, 
      user_id: user_id,
      updateCart: updateCart,
      onLocationSelect: (selectedAddress) => {
        console.log("Address selected from map:", selectedAddress);
        setAddress(selectedAddress);
      }
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
      {cart.length === 0 && !orderPlaced ? (
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

      {/* Checkout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={checkoutModalVisible}
        onRequestClose={() => {
          if (!orderPlaced) setCheckoutModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Order Success View */}
            {orderPlaced ? (
              <View style={styles.orderSuccessContainer}>
                <Ionicons name="checkmark-circle" size={80} color="green" />
                <Text style={styles.orderSuccessTitle}>Order Confirmed!</Text>
                <Text style={styles.orderIdText}>Order ID: #{detail.order_id}</Text>
                
                <View style={styles.orderDetailsCard}>
                  <Text style={styles.orderDetailsTitle}>Order Details</Text>
                  
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailLabel}>User ID</Text>
                    <Text style={styles.orderDetailValue}>{detail.user_id}</Text>
                  </View>
                  
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailLabel}>Restaurant ID</Text>
                    <Text style={styles.orderDetailValue}>{detail.res_id}</Text>
                  </View>
                  
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailLabel}>Delivery Address</Text>
                    <Text style={styles.orderDetailValue}>{detail.address}</Text>
                  </View>
                  
                  <View style={styles.orderDetailRow}>
                    <Text style={styles.orderDetailLabel}>Total Amount</Text>
                    <Text style={styles.orderDetailValue}>₹{detail.price}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.continueShoppingButton}
                  onPress={handleContinueShopping}
                >
                  <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {/* Checkout Form */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Checkout</Text>
                  <TouchableOpacity onPress={() => setCheckoutModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.checkoutFormContainer}>
                  {/* Order Summary */}
                  <View style={styles.checkoutSection}>
                    <Text style={styles.checkoutSectionTitle}>Order Summary</Text>
                    
                    <View style={styles.orderSummaryRow}>
                      <Text style={styles.orderSummaryLabel}>Items</Text>
                      <Text style={styles.orderSummaryValue}>{calculateTotalItems()}</Text>
                    </View>
                    
                    <View style={styles.orderSummaryRow}>
                      <Text style={styles.orderSummaryLabel}>Restaurant ID</Text>
                      <Text style={styles.orderSummaryValue}>{restaurantId}</Text>
                    </View>
                    
                    <View style={styles.orderSummaryTotalRow}>
                      <Text style={styles.orderSummaryTotalLabel}>Total</Text>
                      <Text style={styles.orderSummaryTotalValue}>₹{calculateSubtotal().toFixed(2)}</Text>
                    </View>
                  </View>
                  
                  {/* Delivery Address with Map Button */}
                  <View style={styles.checkoutSection}>
                    <Text style={styles.checkoutSectionTitle}>Delivery Address</Text>
                    <View style={styles.addressInputContainer}>
                      <TextInput
                        style={styles.addressInput}
                        placeholder="Enter your delivery address"
                        value={address}
                        onChangeText={setAddress}
                        multiline
                        numberOfLines={3}
                      />
                      <TouchableOpacity 
                        style={styles.mapButton}
                        onPress={handleMapSelection}
                      >
                        <Ionicons name="location" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* Payment Method - Just a placeholder, not functional */}
                  <View style={styles.checkoutSection}>
                    <Text style={styles.checkoutSectionTitle}>Payment Method</Text>
                    <TouchableOpacity style={styles.paymentOption}>
                      <View style={styles.paymentOptionContent}>
                        <Ionicons name="cash-outline" size={24} color="purple" />
                        <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
                      </View>
                      <Ionicons name="checkmark-circle" size={24} color="purple" />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                
                {/* Place Order Button */}
                <TouchableOpacity 
                  style={styles.placeOrderButton}
                  onPress={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <>
                      <Text style={styles.placeOrderButtonText}>Place Order</Text>
                      <Text style={styles.placeOrderButtonSubtext}>₹{calculateSubtotal().toFixed(2)}</Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    color: 'purple'
  },
  quantityControl: {
    alignItems: 'center'
  },
  quantityControlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 5,
    overflow: 'hidden'
  },
  quantityButton: {
    padding: 8,
    backgroundColor: 'purple'
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
    color: 'purple'
  },
  checkoutButton: {
    backgroundColor: 'purple',
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
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15
  },
  backToMenuButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  checkoutFormContainer: {
    padding: 15,
    maxHeight: '70%'
  },
  checkoutSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15
  },
  checkoutSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  // Styles for map location
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top'
  },
  mapButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentOptionText: {
    marginLeft: 10,
    fontSize: 15
  },
  placeOrderButton: {
    backgroundColor: 'purple',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  placeOrderButtonSubtext: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  
  // Order Success Styles
  orderSuccessContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 40
  },
  orderSuccessTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15
  },
  orderIdText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5
  },
  orderDetailsCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginTop: 20
  },
  orderDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  orderDetailLabel: {
    fontSize: 14,
    color: '#666'
  },
  orderDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333'
  },
  continueShoppingButton: {
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    width: '100%',
    alignItems: 'center'
  },
  continueShoppingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});