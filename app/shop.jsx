import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import { useNavigation ,useRoute} from "@react-navigation/native";
import { useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
// import pro from "./Profile";
import { supabase } from "../components/supabase/supabase"; 
import Profile from "./Profile";

const HomePage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();
  const route = useRoute();
 const { user_id } = route.params || {};
  
 useEffect(() => {
  const fetchRestaurants = async () => {
    const { data, error } = await supabase.from("restaurant_names").select("name, rating, res_id");
    if (error) {
      console.error("Error fetching restaurants:", error);
    } else {
      console.log(data);
      setRestaurants(data);
    }
  };
  fetchRestaurants();
}, []);

const handleRestaurantPress = (restaurant) => {
  // console.log("Full Restaurant Object:", restaurant); // Debugging
  // console.log("Navigating with res_id:", restaurant.res_id); // Debugging
  navigation.navigate("menu", { res_id: restaurant.res_id });
};



  const handleLogout = async () => {
    navigation.replace('LOGIN');
  };
  console.log(user_id);

    return (
      <ImageBackground source={require("@/assets/images/back1.png")} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>CraftDot</Text>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Dashboard Menu */}
        {menuVisible && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile", {user_id: user_id})}> 
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("History", "View Order History")}> 
              <Text style={styles.menuItem}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}> 
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
    
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
    
          <View style={styles.restaurants}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          {restaurants.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              style={styles.restaurantCard1}
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <Image source={require("@/assets/images/bazaar.jpg")} style={styles.restaurantImage1} />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantRating}>⭐ {restaurant.rating} | Fast Delivery</Text>
            </TouchableOpacity>
          ))}
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
