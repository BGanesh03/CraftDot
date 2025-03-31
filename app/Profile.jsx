import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from "../components/supabase/supabase"; 

export default function Profilee() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setPhno] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { user_id } = route.params || {};

  // Fetch user details from Supabase
  console.log("heyyy", user_id);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user_id) {
        Alert.alert('Error', 'User ID not found.');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('name, email, mobile')  // Adjusted column name to 'mobile'
        .eq('user_id', user_id)
        .single();
        console.log("Fetched Data:", data);
      if (error) {
        console.error('Error fetching user:', error);
        Alert.alert('Error', 'Failed to fetch user details.');
      } else if (data) {
        setName(data.name);
        setEmail(data.email);
        setPhno(String(data.mobile)); // Convert number to string

        
 // Set mobile to state variable
      }

    };

    fetchUserDetails();
  }, [user_id]);

  // Save Profile Handler - Updates name & mobile in Supabase
  const handleSave = async () => {
    if (!user_id) {
      Alert.alert('Error', 'User ID missing.');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({ name, mobile })  // Use 'mobile' instead of 'phone'
      .eq('user_id', user_id);

    if (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } else {
      Alert.alert('Success', 'Profile updated successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setPhno}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail Address"
        keyboardType="email-address"
        value={email}
        editable={false} // Email is not editable
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#87CEEB',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    height: 50,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
