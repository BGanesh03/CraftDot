import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, KeyboardAvoidingView, 
  Platform, ScrollView 
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LottieView from "lottie-react-native";
import {auth,db} from "../firebaseauth";
import { supabase } from "../components/supabase/supabase";
// import { getUserByMail } from "@/components/supabase/dbActions";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // ✅ Add this state
  // const navigation = useNavigation();

  const handleLogin = async () => {
    setError("");  // Reset the error state before starting
  
    try {
      // 🔥 Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("Firebase User:", user.email);  // Log the Firebase user email
  
      // 🔍 Fetch data from Supabase (user's name)
      const { data, error: supabaseError } = await supabase
        .from("users")
        .select("user_id")  // Selecting the 'name' field from the users table
        .eq("email", user.email)  // Match by email
        .single();  // Get a single row result
  
      if (supabaseError) {
        console.error("Supabase Fetch Error:", supabaseError);
        setError("Failed to retrieve user data. Try again.");
        return;
      }
      // Log the fetched data from Supabase
      console.log("Fetched Data from Supabase:", data);
  
      // If 'data' is returned successfully, navigate to the Home screen
      if (data) {
        console.log("User Name:", data.user_id);  // Log the user's name fetched from Supabase
        navigation.navigate("Home", { user_id: data.user_id });
         // Pass the name to Home screen (or other relevant data)
          // Pass the name to Home screen (or other relevant data)
      }
  
    } catch (error) {
      console.error("Login Error:", error.message);  // Log any error that occurs during login
      setError(error.message);  // Set the error message to display in the UI
    }
  };
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* Top Half - Lottie Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/lottie/anima.json")} // Ensure the file exists
            autoPlay
            loop
            resizeMode="cover"
            style={styles.lottie}
          />
        </View>

        {/* Bottom Half - Login Inputs */}
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login to Built2Bite</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Don't have an account? 
            <Text style={styles.signupLink} onPress={() => navigation.navigate("SIGNUP")}> Sign Up</Text>
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Top Half: Lottie Animation
  animationContainer: { 
    height: "40%",  
    justifyContent: "center",
    alignItems: "center",
  },

  lottie: { 
    width: "100%", 
    height: "100%",
  },

  // Bottom Half: Login UI
  loginContainer: { 
    height: "60%",  
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff", 
    borderTopLeftRadius: 30,  
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },

  input: { 
    width: "100%", 
    padding: 12, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    backgroundColor: "#f9f9f9", 
    marginBottom: 10, 
    color: "#000",
  },

  button: { backgroundColor: "#ff6600", padding: 12, borderRadius: 10, width: "100%", alignItems: "center" },

  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  signupText: { color: "#666", marginTop: 10 },
  signupLink: { color: "#ff6600", fontWeight: "bold" },
});

export default LoginScreen;
