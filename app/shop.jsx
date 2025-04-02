import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
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
    navigation.navigate("menu", { res_id: restaurant.res_id , user_id : user_id});
    // navigation.navigate("menu", { user_id: user_id }); 
    
  };

  const handleLogout = async () => {
    navigation.replace("LOGIN");
  };

  return (
    <ImageBackground source={require("@/assets/images/back1.png")} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>CraftDot</Text>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {menuVisible && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile", { user_id: user_id })}>
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

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Order Your Favorite Food</Text>
          <Text style={styles.heroSubtitle}>Customize your meal, reduce waste, and enjoy fresh food.</Text>
          <TextInput style={styles.searchBox} placeholder="Search for restaurants or dishes..." />
        </View>

        <View style={styles.categories}>
          <View style={styles.categoryCard}><Text style={styles.categoryText}>Fast Delivery</Text></View>
          <View style={styles.categoryCard}><Text style={styles.categoryText}>Offers & Discounts</Text></View>
          <View style={styles.categoryCard}><Text style={styles.categoryText}>Top Rated</Text></View>
          <View style={styles.categoryCard}><Text style={styles.categoryText}>Customizable Orders</Text></View>
          <View style={styles.categoryCard}><Text style={styles.categoryText}>Healthy</Text></View>
        </View>

        <View style={styles.restaurants}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          {restaurants.map((restaurant, index) => (
            <TouchableOpacity key={index} style={styles.restaurantCard1} onPress={() => handleRestaurantPress(restaurant)}>
              <Image source={require("@/assets/images/bazaar.jpg")} style={styles.restaurantImage1} />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantRating}>⭐ {restaurant.rating} | Fast Delivery</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>&copy; 2025 CraftDot. All rights reserved.</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: "cover" },
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, backgroundColor: "purple" },
  logo: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  heroSection: { padding: 40, alignItems: "center", backgroundColor: "#D3D3D3" },
  heroTitle: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "purple" },
  heroSubtitle: { fontSize: 16, textAlign: "center", color: "#666", marginTop: 5 },
  searchBox: { marginTop: 10, width: "90%", padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#ccc" },
  categories: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 20 },
  categoryCard: { backgroundColor: "#D3D3D3", padding: 15, borderRadius: 10, margin: 5 },
  categoryText: { fontWeight: "bold", color: "purple" },
  restaurants: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "purple" },
  restaurantCard1: { width: 360, backgroundColor: "#D3D3D3", borderRadius: 10, padding: 10, alignItems: "center", marginRight: 15 },
  restaurantImage1: { width: 280, height: 200, borderRadius: 10 },
  restaurantName: { fontSize: 16, fontWeight: "bold", marginTop: 5, color: "purple" },
  restaurantRating: { fontSize: 14, color: "#666" },
  footer: { padding: 10, backgroundColor: "purple", alignItems: "center", marginTop: 20 },
  footerText: { color: "#fff" }
});

export default HomePage;
