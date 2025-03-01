import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground, Alert } from "react-native";

const HomePage = () => {
  const handleRestaurantPress = (name) => {
    Alert.alert("Selected", `You selected ${name}`);
  };

    return (
        <ImageBackground source={require("@/assets/images/back1.png")} style={styles.backgroundImage}>
        <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>CraftDot</Text>
            </View>
            {/* <View style={styles.authButtons}>
              <TouchableOpacity onPress={() => console.log("Navigate to Login")}>
                <Text style={styles.navLink}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={() => console.log("Navigate to Sign Up")}>
                <Text style={styles.navButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View> */}
    
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Order Your Favorite Food</Text>
            <Text style={styles.heroSubtitle}>Customize your meal, reduce waste, and enjoy fresh food.</Text>
            <TextInput style={styles.searchBox} placeholder="Search for restaurants or dishes..." />
          </View>
    
          {/* Categories */}
          <View style={styles.categories}>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Fast Delivery</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Offers & Discounts</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Top Rated</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Customizable Orders</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryText}>Healthy</Text>
            </View>
          </View>
    
          {/* Featured Restaurants */}
          <View style={styles.restaurants}>
            <Text style={styles.sectionTitle}>Popular Restaurants</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularrestaurant}>
              <TouchableOpacity 
                style={styles.restaurantCard} 
                onPress={() => handleRestaurantPress("Foodie's Delight")}
              >
                <Image source={require("@/assets/images/bazaar.jpg")} style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>Foodie's Delight</Text>
                <Text style={styles.restaurantRating}>⭐ 4.5 | Fast Delivery</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.restaurantCard}
                onPress={() => handleRestaurantPress("Taste Hub")}
              >
                <Image source={require("@/assets/images/kitchen.jpg")} style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>Taste Hub</Text>
                <Text style={styles.restaurantRating}>⭐ 4.2 | Customizable Dishes</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.restaurantCard}
                onPress={() => handleRestaurantPress("Spice Heaven")}
              >
                <Image source={require("@/assets/images/bazaar.jpg")} style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>Spice Heaven</Text>
                <Text style={styles.restaurantRating}>⭐ 4.7 | Best Offers</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.restaurantCard}
                onPress={() => handleRestaurantPress("Bake Your Cake")}
              >
                <Image source={require("@/assets/images/cake.jpg")} style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>bake your cake</Text>
                <Text style={styles.restaurantRating}>⭐ 4.8 | Best Offers</Text>
              </TouchableOpacity>
            </ScrollView>
            
            <View>
              <Text style={styles.heroTitle}>Restaurants</Text>
              <ScrollView>
              <TouchableOpacity 
                style={styles.restaurantCard1}
                onPress={() => handleRestaurantPress("Foodie's Delight")}
              >
                <Image source={require("@/assets/images/bazaar.jpg")} style={styles.restaurantImage1} />
                <Text style={styles.restaurantName}>Foodie's Delight</Text>
                <Text style={styles.restaurantRating}>⭐ 4.5 | Fast Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.restaurantCard1}
                onPress={() => handleRestaurantPress("Taste Hub")}
              >
                <Image source={require("@/assets/images/kitchen.jpg")} style={styles.restaurantImage1} />
                <Text style={styles.restaurantName}>Taste Hub</Text>
                <Text style={styles.restaurantRating}>⭐ 4.2 | Customizable Dishes</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.restaurantCard1}
                onPress={() => handleRestaurantPress("Spice Heaven")}
              >
                <Image source={require("@/assets/images/bazaar.jpg")} style={styles.restaurantImage1} />
                <Text style={styles.restaurantName}>Spice Heaven</Text>
                <Text style={styles.restaurantRating}>⭐ 4.7 | Best Offers</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.restaurantCard1}
                onPress={() => handleRestaurantPress("Bake Your Cake")}
              >
                <Image source={require("@/assets/images/cake.jpg")} style={styles.restaurantImage1} />
                <Text style={styles.restaurantName}>bake your cake</Text>
                <Text style={styles.restaurantRating}>⭐ 4.8 | Best Offers</Text>
              </TouchableOpacity>
              </ScrollView>
            </View>
    
            <View>
            </View>
    
            <TouchableOpacity 
              style={styles.cart}
              onPress={() => Alert.alert("Cart", "View cart items")}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>View Cart</Text>
            </TouchableOpacity>
          </View>
    
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>&copy; 2025 CraftDot. All rights reserved.</Text>
          </View>
        </ScrollView>
        </ImageBackground>
      );
    }
const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: "cover" },
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "#ff6600" },
  logo: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  authButtons: { flexDirection: "row", alignItems: "center" },
  navLink: { color: "#fff", fontSize: 16, marginRight: 15 },
  navButton: { backgroundColor: "#fff", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5 },
  navButtonText: { color: "#ff6600", fontWeight: "bold" },
  heroSection: { padding: 40, alignItems: "center", backgroundColor: "#f8f8f8" },
  heroTitle: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#333" },
  heroSubtitle: { fontSize: 16, textAlign: "center", color: "#666", marginTop: 5 },
  searchBox: { marginTop: 10, width: "90%", padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#ccc" },
  categories: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 20 },
  categoryCard: { backgroundColor: "#ffcc80", padding: 15, borderRadius: 10, margin: 5 },
  categoryText: { fontWeight: "bold" },
  restaurants: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  popularrestaurant: { flexDirection: "row" },
  restaurantCard: { width: 280, backgroundColor: "#f8f8f8", borderRadius: 10, padding: 10, alignItems: "center", marginRight: 15 },
  restaurantImage: { width: 240, height: 180, borderRadius: 10 },
  restaurantCard1: { width: 360, backgroundColor: "#f8f8f8", borderRadius: 10, padding: 10, alignItems: "center", marginRight: 15 },
  restaurantImage1: { width: 280, height: 200, borderRadius: 10 },
  restaurantName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  restaurantRating: { fontSize: 14, color: "#666" },
  footer: { padding: 10, backgroundColor: "#333", alignItems: "center", marginTop: 20 },
  footerText: { color: "#fff" },
  cart: { padding: 10, backgroundColor: "orange", alignItems: "center", marginTop: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15 }
});

export default HomePage;
