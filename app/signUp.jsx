import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  Alert, ScrollView, StyleSheet, KeyboardAvoidingView, Platform 
} from 'react-native';
import { auth, db } from '@/firebaseauth';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import LottieView from "lottie-react-native";

export default function SignUp() {
  const navigation = useNavigation();

  // State for user input
  const [fname, setFname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const Register = async () => {
    if (!fname || !mobile || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 🔹 Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: fname.trim(),
        mobile: mobile.trim(),
        email: user.email,
        createdAt: new Date(),
      });

      Alert.alert("Signup Successful", "Your account has been created!");
      navigation.replace("LOGIN"); // Redirect to login page
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
   
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* 🔹 Lottie Animation (30% of the screen) */}
        <View style={styles.animationContainer}>
          <LottieView 
            source={require("../assets/lottie/signup.json")} // Ensure this file exists
            autoPlay
            loop
            resizeMode="cover"
            style={styles.lottie}
          />
        </View>

        {/* 🔹 Sign-up Form (70% of the screen) */}
        <View style={styles.signupContainer}>
          <Text style={styles.title}>Create a New Account</Text>

          <TextInput placeholder="Full Name" value={fname} onChangeText={setFname} style={styles.input} />
          <TextInput placeholder="Mobile No." value={mobile} onChangeText={setMobile} style={styles.input} keyboardType="phone-pad" />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

          <TouchableOpacity onPress={Register} style={styles.button} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Creating Account..." : "Submit"}</Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Top 30% - Lottie Animation
  animationContainer: { 
    height: "30%",  
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: { 
    width: "100%", 
    height: "100%",
  },

  // Bottom 70% - Sign-up Form
  signupContainer: { 
    height: "70%",  
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

  loginLinkContainer: { flexDirection: "row", gap: 10, marginTop: 10, justifyContent: "center" },
  loginText: { fontSize: 18 },
  loginLink: { color: "blue", fontSize: 18 },
});

// export default SignUp;
