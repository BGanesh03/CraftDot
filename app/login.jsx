import { useNavigation } from 'expo-router';
import { useState } from 'react';
import {Text,View,TextInput,Pressable,TouchableOpacity,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login(){
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigation =useNavigation();

  const Login=()=>{
    console.log(email,password);
  }

  return (
    <ScrollView>
          <View style={{display:'flex',flex:3,paddingBottom:110,paddingTop:110,alignItems:'center', backgroundColor : "rgb(223, 187, 187)"}}>
      
      <View>
        <Image source={require('../assets/images/login2.jpg')} style={{width:300,height:250,paddingBottom : 100}} />
      </View>
      <Text style={{fontFamily:'Mobile',marginTop:25,fontSize:30,marginBottom:20}}>Welcome Back to Login</Text>
      <View style={{width:'100%',padding:10}}>
        <TextInput placeholder="Email" 
          style={{borderWidth:1,borderRadius:8,padding:6,marginBottom:20}} onChangeText={setEmail} />
        <TextInput placeholder="Password" onChangeText={setPassword} 
          style={{borderWidth:1,borderRadius:8,padding:6,marginBottom:20}}/>
      </View>

      
        <TouchableOpacity 
        style={{padding:10,backgroundColor:'orange',borderRadius:8,width:'100%',}} onPress={Login}>
          <Text
          style={{textAlign:'center',fontFamily:'marginTop',fontSize:20}}
          >Login</Text>
        </TouchableOpacity>
      

      <View style={{display:'flex',flexDirection:'row',marginTop:10}}>
        <Text style={{fontFamily:'alignItems',fontSize:18}}>Don't have an Account?</Text>
        <Pressable onPress={()=> navigation.navigate('SIGNUP')}>
          <Text style={{color:'blue',fontFamily:'alignItems',marginLeft:5,fontSize:18}}>Create a New</Text>
        </Pressable>
        
      </View>
    </View>
    </ScrollView>

  )
}
