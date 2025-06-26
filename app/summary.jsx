import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import HomePage from './shop';

export default function OrderSummary() {
  const route = useRoute();
  const navigation = useNavigation();
  
  const { orderId, userId, restaurantId, items, totalPrice, address } = route.params;

  const goToHome = () => {
    // This should navigate to your app's home screen
    // You might need to reset the navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Confirmed</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Success message */}
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color="green" />
          <Text style={styles.successText}>Your order has been placed successfully</Text>
          <Text style={styles.orderIdText}>Order ID: #{orderId}</Text>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>User ID</Text>
            <Text style={styles.detailValue}>{userId}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Restaurant ID</Text>
            <Text style={styles.detailValue}>{restaurantId}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Delivery Address</Text>
            <Text style={styles.detailValue}>{address}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          {items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemContent}>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>{item.dish_name}</Text>
                  {item.customIngredients && item.customIngredients.length > 0 && (
                    <Text style={styles.customIngredientsText}>
                      {item.customIngredients.map(ing => 
                        `${ing.ingredient} x${ing.selectedQuantity}`
                      ).join(', ')}
                    </Text>
                  )}
                </View>
                <View style={styles.itemPriceContainer}>
                  <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                  <Text style={styles.itemPrice}>₹{(item.totalPrice * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          ))}
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Shopping Button */}
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.continueButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    elevation: 2
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  content: {
    flex: 1,
    padding: 15
  },
  successContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 2
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5
  },
  orderIdText: {
    fontSize: 16,
    color: '#666'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
    flex: 1
  },
  detailValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right'
  },
  itemCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 10
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemTextContainer: {
    flex: 1
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333'
  },
  customIngredientsText: {
    fontSize: 13,
    color: '#666',
    marginTop: 3
  },
  itemPriceContainer: {
    alignItems: 'flex-end'
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'purple'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple'
  },
  continueButton: {
    backgroundColor: 'purple',
    padding: 15,
    alignItems: 'center'
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});