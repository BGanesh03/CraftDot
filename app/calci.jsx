import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function CalCalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2'); // sedentary
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      alert("Please enter valid numbers.");
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const totalCalories = Math.round(bmr * act);
    setCalories(totalCalories);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calorie Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Age (years)"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text style={styles.label}>Activity Level:</Text>
      <Picker
        selectedValue={activity}
        onValueChange={(itemValue) => setActivity(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sedentary (little to no exercise)" value="1.2" />
        <Picker.Item label="Light exercise (1-3 days/week)" value="1.375" />
        <Picker.Item label="Moderate exercise (3-5 days/week)" value="1.55" />
        <Picker.Item label="Heavy exercise (6-7 days/week)" value="1.725" />
        <Picker.Item label="Athlete (2x/day)" value="1.9" />
      </Picker>

      <Button title="Calculate" onPress={calculateCalories} />

      {calories && (
        <Text style={styles.result}>
          Your daily calorie need: {calories} kcal
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 8,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
    marginBottom: 15,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});
