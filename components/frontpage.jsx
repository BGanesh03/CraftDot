import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
// import LoginScreen from "./login.jsx/index.js";
import login from '../components/login';
import siginup from './siginup';
import { useRouter } from "expo-router";
import LoginScreen from "../components/login";

export default function FrontPage() {
  const router = useRouter();
  // const [showLogin, setShowLogin] = useState(false); // Track screen state

  // if (showLogin) {
  //   return <LoginScreen />; // Show LoginScreen on button press
  // }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/food.jpeg")}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Built2Bite Food</Text>

        {/* ✅ Ensuring Button is Visible */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => LoginScreen()}>
            <Text style={{backgroundColor:'white',padding:10,borderRadius:10,textAlign:'center',fontFamily:'alert'}}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    flex: 1, // Take remaining space
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    gap: 10, // Center text & button
    padding: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
  buttonContainer: {
    color: "black",
    width: "80%", // Ensure button is not too wide
  },
});
