import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  image: { width: "100%", height: 250 },
  content: { flex: 1, backgroundColor: "orange", alignItems: "center", padding: 35 },
  title: { fontSize: 30, fontWeight: "bold", textAlign: "center", color: "black" },
  button: { backgroundColor: "white", padding: 10, borderRadius: 10, width: 200 },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  signupButton: { backgroundColor: "black", padding: 10, borderRadius: 10, width: 200 },
  signupText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default styles;
