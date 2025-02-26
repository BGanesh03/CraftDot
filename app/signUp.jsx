import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { Text, View,TextInput,Pressable, StyleSheet,TouchableOpacity, Image } from 'react-native';
// import { auth } from "../services/firebase"
import { createUserWithEmailAndPassword }from "firebase/auth";
import { ScrollView } from 'react-native-gesture-handler';
export default function SiginUp(){
    const navigation =useNavigation();

const [fname,setFname] = useState();
const [mobile,setMobile] = useState();
const [email,setEmail] = useState();
const [password,setPassword] = useState();

const Register = ()=>{
  createUserWithEmailAndPassword(auth,email,password)
  .then(async(UserCredential)=>{
    const user = UserCredential.user;
    console.log(user);
    // save user to database
    await saveUser(user);
  })
  .catch(e=>{
    console.log(e.message)
  })
}

const saveUser = async(user)=>{
  await setDoc(doc(db,'users',email),{
    name:fname,
    mobile:mobile,
    email:email,
    password:password,
    uid:user?.uid
  })
}

  return (
    <ScrollView>
          <View style={{backgroundColor:'#cebde6',height : 800}}>

<View style={{justifyContent:'center',
  alignItems:'center',backgroundColor : "#cebde6"}}>
  <Image source={require('../assets/images/si.jpg')} style={{width:400,height:250,marginTop : 0}} />
</View>
<Text style={{marginTop:20,textAlign:'center',fontFamily:'backgroundColor',fontSize:25}}>Create a New Account </Text>
<View style={{margin:30}}>
  <TextInput placeholder='Full Name' 
  onChangeText={(value)=>setFname(value)}
  style={{borderWidth:1,
  marginBottom:15,
  padding:8,
  borderRadius:8,
  }}
  />
  <TextInput placeholder='Mobile No.'
  onChangeText={(value)=>setFname(value)} 
  style={{borderWidth:1,
  padding:8,
  marginBottom:15,
  borderRadius:8,
  }}
  />
  <TextInput placeholder='Email' 
  onChangeText={(value)=>setFname(value)}
  style={{borderWidth:1,
  padding:8,
  marginBottom:15,
  borderRadius:8,
  }}
  />

  <TextInput placeholder='Password' 
  onChangeText={(value)=>setFname(value)}
  style={{borderWidth:1,
  padding:8,
  borderRadius:8,
  }}
  />
</View>

<View>
  <TouchableOpacity onPress={Register} style={{marginLeft:40,marginRight:40,
  padding:10,borderRadius:8,backgroundColor:'blue'
  }}>
    <Text style={{textAlign:'center',color:'white'}}>Submit</Text>
  </TouchableOpacity>
</View>

<View style={{display:'flex',flexDirection:'row',gap:10,marginTop:10,justifyContent:'center'}}>
  <Text  style={{fontFamily:'AssetExample',fontSize:18,textAlign:'center'}}>Already have an Account ?</Text>
  <Pressable onPress={()=>navigation.navigate('LOGIN')}>
    <Text style={{color:'blue',fontSize:18,fontFamily:'AssetExample' }}>Login </Text>
  </Pressable>
</View>

</View>
    </ScrollView>

  )
}
