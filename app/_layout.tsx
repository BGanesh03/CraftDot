
// import { Stack } from 'expo-router';

// // import Landing from './index';
// import Login from './login';
// export default function RootLayout() {
//   return (
//     // <Landing />
//     <Login />
//   );
// }

import Login from '../app/login';
import Index from '../app/index';
import SignUp from '../app/signUp';
import HomePage from '../app/shop'; // Import your homepage

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName='INDEX'>
      <Stack.Screen name="INDEX" component={Index} />
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="SIGNUP" component={SignUp} />
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
}