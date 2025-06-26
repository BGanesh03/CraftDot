import { Image, StyleSheet, TextInput,Text,View,TouchableOpacity, Button, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '@/services/firebaseauth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// ✅ Define screen types
type ScreenType = "front" | "login" | "signup";

// ✅ Define props type for components
interface ScreenProps {
  setScreen: React.Dispatch<React.SetStateAction<ScreenType>>;
}

export default function App() {
  const [screen, setScreen] = useState<ScreenType>("front"); // ✅ Properly typed

  return (
    <View style={styles.container}>
      {screen === "front" && <FrontPage setScreen={setScreen} />}
      {screen === "login" && <LoginScreen setScreen={setScreen} />}
      {screen === "signup" && <SignUpScreen setScreen={setScreen} />}
    </View>
  );
}

// ✅ `setScreen` now has an explicit type
function FrontPage({ setScreen }: ScreenProps) {
  return (
    <View style={styles.container1}>
      <Image
              source={require("@/assets/images/food.jpeg")}
              style={styles.image}
            />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Built2Bite Food</Text>

        {/* ✅ Clicking button changes screen */}
        <TouchableOpacity onPress={() => setScreen("login")} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("signup")} style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ✅ `LoginScreen` correctly types `setScreen`
function LoginScreen({ setScreen }: ScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Login Attempt: ${username}, ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={styles.container1}>
            <ParallaxScrollView
              headerBackgroundColor={{ light: '#909699', dark: '#ccc' }}
              headerImage={
                <Image
                  source={require('@/assets/images/food1.jpeg')}
                  style={styles.reactLogo}
                />
              }>
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Login</ThemedText>
              </ThemedView>
              <ThemedView style={styles.inputContainer}>
                <ThemedText type="subtitle">Username</ThemedText>
                <TextInput
                  style={styles.input1}
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={(text) => setUsername(text)}

                  autoFocus
                />
              </ThemedView>
              <View style={styles.inputContainer}>
                <ThemedText type="subtitle">Password</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
               <Button title="Login" onPress={handleLogin} />
                    <Text  style={styles.but}onPress={() => setScreen("front")}>Back</Text>
              <ThemedText type="text">
                Your Food !! Your Craft
              </ThemedText>
            </ParallaxScrollView>
          </ThemedView>
        </TouchableWithoutFeedback>
  );
}

// ✅ `SignUpScreen` correctly types `setScreen`
function SignUpScreen({ setScreen }: ScreenProps) {
  const [username, setUserName] = useState("");
  const [name , setName] = useState("");
  const [email , setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile , setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSignup = () => {
    // alert(`Signup Attempt: ${username}, ${password}`);
    console.log(email,password);
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      AsyncStorage.setItem("user",JSON.stringify(user))
    })  
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container1}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#909699', dark: '#ccc' }}
        headerImage={
          <Image
            source={require('@/assets/images/food1.jpeg')}
            style={styles.reactLogo}
          />
        }>
    <ThemedView style={styles.content1}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" > Sign Up</ThemedText>
        </View>
        <View style={styles.inputContainer}>
          <ThemedText type="subtitle">Enter name</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="Enter your username"
            value={name}
            onChangeText={(text) => setName(text)}
            autoFocus
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText type="subtitle">Enter username</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUserName(text)}
            autoFocus
          />
        </View>
        <View style={styles.inputContainer}>
          <ThemedText type="subtitle">Enter Mobile No</ThemedText>
          <TextInput
            style={styles.input}
            // placeholder="Enter your username"
            value={mobile}
            onChangeText={(Number) => setMobile(Number)}
            autoFocus
          />
        </View>
        {/* Role Selection */}
        <View style={styles.inputContainer}>
              <ThemedText type="subtitle">Select Role</ThemedText>
              <Picker style={styles.pickerContainer} selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)}>
                <Picker.Item label="Customer" value="customer" />
                <Picker.Item label="Restaurant" value="restaurant" />
                <Picker.Item label="Delivery Partner" value="delivery" />
              </Picker>
            </View>

            {/* Conditional Fields for Restaurant */}
            {role === "restaurant" && (
              <View style={styles.inputContainer}>
                <ThemedText type="subtitle">Restaurant Name</ThemedText>
                <TextInput style={styles.input} placeholder="Enter your restaurant name" />
              </View>
            )}

            {/* Conditional Fields for Delivery Partner */}
            {role === "delivery" && (
              <View style={styles.inputContainer}>
                <ThemedText type="subtitle" >Vehicle Type</ThemedText>
                <Picker style={styles.input} >
                  <Picker.Item label="Bike" value="bike" />
                  <Picker.Item label="Cycle" value="cycle" />
                  <Picker.Item label="Car" value="car" />
                </Picker>
              </View>
            )}

            <View style={styles.inputContainer}>
              <ThemedText type="subtitle">Password</ThemedText>
              <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
            </View>
            <View style={styles.inputContainer}>
              <ThemedText type="subtitle">Confirm Password</ThemedText>
              <TextInput style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            </View>
         <Button title="Sign Up" onPress={handleSignup} />
              <Text  style={styles.but}onPress={() => setScreen("front")}>Back</Text>
        <ThemedText type="text">
          Your Food !! Your Craft
        </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </View>
  </TouchableWithoutFeedback>
  );
}

// ✅ Styles for UI
const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
   color : "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content1: {
    flex: 1,
    backgroundColor: "#876C54",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 35,
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
  but:{
    fontSize : 24,
    color : "#fffff2",
    marginBottom : 20,
    justifyContent : "center",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  signupText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height : 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  inputContainer: {
    gap: 8,
    marginBottom: 16,
  },
  input1: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    width: 300,
  },
  label: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 5,
    // width : 140
  },
  reactLogo: {
    height: 240,
    width: 425,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});



