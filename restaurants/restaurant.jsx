import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from '@/components/supabase/supabase';// Importing Supabase client

const RestaurantSignUp = ({ navigation }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!restaurantName || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
  
    try {
      // Sign up the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) throw authError;
  
      const userId = authData?.user?.id; // Extracting user ID from the response
  
      if (!userId) {
        throw new Error("User ID not found after signup");
      }
  
      // Insert restaurant details into the database
      const { error: dbError } = await supabase
        .from("restaurants")
        .insert([{ restaurant_name: restaurantName, email, uid: userId }]);
  
      if (dbError) throw dbError;
  
      Alert.alert("Success", "Restaurant account created!");
      navigation.navigate("RestaurantHome");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Restaurant Sign Up</Text>

      <TextInput
        placeholder="Restaurant Name"
        value={restaurantName}
        onChangeText={setRestaurantName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      <Text style={{ textAlign: "center", marginTop: 10 }}>Already have an account?</Text>
      <Button title="Login" onPress={() => navigation.navigate("resLog")} />
    </View>
  );
};

export default RestaurantSignUp;
