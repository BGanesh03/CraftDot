import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Modal,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '../components/supabase/supabase';

const { width, height } = Dimensions.get('window');

export default function RestaurantMenu() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user_id , res_id} = route.params || {};
  // const res_id = route.params?.res_id;

  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [customIngredients, setCustomIngredients] = useState([]);

  useEffect(() => {
    if (!res_id) {
      console.error("Error: res_id is undefined");
      return;
    }

    const fetchMenuData = async () => {
      try {
        const { data: menuData, error: menuError } = await supabase
          .from("menu_card")
          .select("dish_id, dish_name, base_price, description")
          .eq("res_id", res_id);

        if (menuError) {
          console.error("Error fetching menu:", menuError);
          return;
        }

        setMenuItems(menuData || []);
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchMenuData();
  }, [res_id]);

  const fetchCustomIngredients = async (dishId) => {
    try {
      const { data: ingredientsData, error } = await supabase
        .from("custom")
        .select("qid, dish_id, ingredient, quantity, price")
        .eq("dish_id", dishId);

      if (error) {
        console.error("Error fetching custom ingredients:", error);
        return [];
      }

      return ingredientsData.map(ingredient => ({
        ...ingredient,
        selectedQuantity: 0
      }));
    } catch (error) {
      console.error("Unexpected error:", error);
      return [];
    }
  };

  const openCustomizationModal = async (dish) => {
    const ingredients = await fetchCustomIngredients(dish.dish_id);
    setSelectedDish(dish);
    setCustomIngredients(ingredients);
  };

  const increaseIngredientQuantity = (ingredientId) => {
    setCustomIngredients(customIngredients.map(ingredient => 
      ingredient.qid === ingredientId 
        ? { ...ingredient, selectedQuantity: ingredient.selectedQuantity + 1 }
        : ingredient
    ));
  };

  const decreaseIngredientQuantity = (ingredientId) => {
    setCustomIngredients(customIngredients.map(ingredient => 
      ingredient.qid === ingredientId && ingredient.selectedQuantity > 0
        ? { ...ingredient, selectedQuantity: ingredient.selectedQuantity - 1 }
        : ingredient
    ));
  };

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

  const addCustomizedDishToCart = () => {
    if (!selectedDish) return;

    const selectedIngredients = customIngredients.filter(ing => ing.selectedQuantity > 0);
    
    // Calculate only the cost of customizations
    const customizationPrice = selectedIngredients.reduce((total, ingredient) => 
      total + (ingredient.price * ingredient.selectedQuantity), 0);

    // Create dish object with ONLY customization price as the total price
    const customizedDish = {
      ...selectedDish,
      customIngredients: selectedIngredients,
      totalPrice: customizationPrice,  // Only the customization price
      basePrice: selectedDish.base_price  // Store base price just for reference
    };

    const existingItemIndex = findExistingItemIndex(cart, customizedDish);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...customizedDish, quantity: 1 }]);
    }

    setSelectedDish(null);
    setCustomIngredients([]);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  };

  const calculateCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const updateCartFromMenu = (updatedCart) => {
    setCart(updatedCart);
  };

  const navigateToCart = () => {
    navigation.navigate('CartPage', { 
      cartItems: cart, 
      restaurantId: res_id,
      user_id : user_id,
      updateCart: updateCartFromMenu
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Menu</Text>
      </View>

      <ScrollView 
        style={styles.menuContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuScrollContent}
      >
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.dish_id} 
            style={styles.menuItemCard}
            onPress={() => openCustomizationModal(item)}
          >
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemName}>{item.dish_name}</Text>
              <Text style={styles.menuItemDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.menuItemPrice}>₹{item.base_price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal 
        visible={!!selectedDish} 
        transparent={true} 
        animationType="slide"
        onRequestClose={() => setSelectedDish(null)}
      >
        {selectedDish && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedDish.dish_name}</Text>
              
              <ScrollView style={styles.ingredientsScroll}>
                {customIngredients.map((ingredient) => (
                  <View key={ingredient.qid} style={styles.ingredientRow}>
                    <Text style={styles.ingredientText}>
                      {ingredient.ingredient} - ₹{ingredient.price}
                    </Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        onPress={() => decreaseIngredientQuantity(ingredient.qid)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {ingredient.selectedQuantity}
                      </Text>
                      <TouchableOpacity 
                        onPress={() => increaseIngredientQuantity(ingredient.qid)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <TouchableOpacity 
                style={styles.addToCartButton} 
                onPress={addCustomizedDishToCart}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>

      {cart.length > 0 && (
        <TouchableOpacity 
          style={styles.cartBox} 
          onPress={navigateToCart}
        >
          <Text style={styles.cartBoxText}>
            Cart ({calculateCartItemCount()} items) - ₹{calculateCartTotal().toFixed(2)}
          </Text>
          <Ionicons name="cart" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  header: { 
    flexDirection: 'row', 
    padding: 15, 
    alignItems: 'center', 
    backgroundColor: 'white', 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: { 
    marginRight: 15 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#333' 
  },
  menuContainer: { 
    flex: 1 
  },
  menuScrollContent: {
    paddingBottom: 80
  },
  menuItemCard: { 
    backgroundColor: 'white', 
    marginHorizontal: 15, 
    marginVertical: 8, 
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemContent: {
    flexDirection: 'column'
  },
  menuItemName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333',
    marginBottom: 5 
  },
  menuItemDescription: { 
    fontSize: 14, 
    color: '#666',
    marginBottom: 5 
  },
  menuItemPrice: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: 'purple' 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: height * 0.7
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333'
  },
  ingredientsScroll: {
    maxHeight: 300
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  ingredientText: {
    fontSize: 15,
    color: '#333'
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  quantityButtonText: {
    fontSize: 16,
    color: 'purple'
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16
  },
  addToCartButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center'
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  cartBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'purple',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cartBoxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});