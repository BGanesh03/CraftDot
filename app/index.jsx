import { Link, Stack, useNavigation } from 'expo-router';
import { Text, View,TouchableOpacity, Image } from 'react-native';
import RootLayout from '@/app/_layout';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Landing() {

  const navigation = useNavigation();
  // const gotoLogin = ()=>{
  //   navigation.navigate('LOGIN');
  // }

  return (
    <ScrollView>
          <View>
          <Image 
  source={require('../assets/images/front.png')} 
  style={{ height: 350, width: 250, alignSelf: "center", resizeMode: "contain" }} 
/>

      <View style={{backgroundColor:'blue',height:345,marginTop : 25}}>
        <View>
        <Text 
          style={{fontFamily:'backgroundColor',
                  fontSize:30,
                  textAlign:'center',
                  color:'white',
                  marginTop:30,
                  marginBottom:20
          }}>Welcome to Built2Bite </Text>
        </View>

          <Text style={{fontSize:20,
            fontFamily:'delivered',
            color:'white',
            textAlign:'center',
            marginTop:10,
            padding:10,
            marginBottom:20}}>"Good food is the foundation of genuine happiness and now, it can be delivered to your door."</Text>

        <TouchableOpacity style={{backgroundColor:'white',padding:10,margin:20,borderRadius:20
        }}
        onPress={()=>navigation.navigate("LOGIN")}>
          <Text style={{textAlign:'center'}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>

     )
}
 const styles = StyleSheet.create({
  ima :{
    display : "flex",
    flex : 2,
    height : 200,
    width : 300,
  }
 })
