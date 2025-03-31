import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebaseauth";
import { supabase } from "../components/supabase/supabase"; // Import Supabase client

export default function Loginn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

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
        navigation.navigate("Home", { user_id: data.user_id });  // Pass the name to Home screen (or other relevant data)
      }
  
    } catch (error) {
      console.error("Login Error:", error.message);  // Log any error that occurs during login
      setError(error.message);  // Set the error message to display in the UI
    }
  };
  

  const handleSignupp = () => {
    navigation.navigate("SIGNUP");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {error !== "" && (
        <View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.signupContainer} onPress={handleSignupp}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#333",
  },
  signupLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});