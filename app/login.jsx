import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, KeyboardAvoidingView, 
  Platform, ScrollView 
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LottieView from "lottie-react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Logging in with:", email, password);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Successful", "Welcome back!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
      Alert.alert("Login Failed", `Error: ${error.message}`);
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
          <Text style={styles.title}>Login to CraftDot</Text>

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
