import { Image, StyleSheet, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SignUp from './siginup'; // Ensure the filename is correct

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // State to switch between Login and SignUp

  const handleLogin = () => {
    Alert.alert('Login Attempt', `Username: ${username}, Password: ${password}`);
  };

  const handleSignup = () => {
    setIsSignup(true); // Switch to SignUp screen
  };

  // If SignUp is active, render the SignUp component and pass a callback to return to login
  if (isSignup) {
    return <SignUp onGoBack={() => setIsSignup(false)} />;
  }

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
          <ThemedView style={styles.inputContainer}>
            <ThemedText type="subtitle">Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </ThemedView>
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

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'red',
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
  reactLogo: {
    height: 240,
    width: 425,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
