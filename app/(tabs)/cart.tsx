import { StyleSheet, Text, View } from 'react-native';

export default function Cart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Fixed the issue
  },
  title: {
    // width: 0,
    height: 100,
    borderRadius: 10,
    flex : 2,
    marginTop : 40,
    marginBottom : 600,
    marginLeft : 25,
    marginRight : 25,
    backgroundColor : "rgba(175, 158, 158, 0.74)",
    borderWidth : 5,
    borderBlockColor : "	#696968",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    // marginBottom: 20,
  },
});
