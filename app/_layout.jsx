import CartPage from './cart'
import Login from './login';
import Index from './index';
import SignUp from './signUp';
import RestaurantSignUp from '../restaurants/restaurant';
import HomePage from './shop'; // Import your homepage
import RestaurantLogin from '../restaurants/reslogin';
// import Profile from './Profile';
import Profilee from './Profile';
import RestaurantMenu from './menu';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './MapScreen';
import OrderSummary from './summary'
// import HomePage from '../shop.jsx'
const Stack = createStackNavigator();

import { StatusBar } from 'react-native';
import CalCalculator from './calci';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator 
        initialRouteName="INDEX"
        screenOptions={{
          headerShown: false, // Hide default headers
          cardStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen name="INDEX" component={Index} options={{ title: 'Welcome' }} />
        <Stack.Screen name="LOGIN" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="SIGNUP" component={SignUp} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
        <Stack.Screen name="rest" component={RestaurantSignUp} options={{ title: 'Restaurant Sign Up' }} />
        <Stack.Screen name="resLog" component={RestaurantLogin} options={{ title: 'Restaurant Login' }} />
         <Stack.Screen name="Profile" component={Profilee} options={{ title: 'Profilee' }} /> 
         <Stack.Screen name="menu" component={RestaurantMenu} options={{ title: 'RestaurantMenu' }} /> 
        <Stack.Screen name="CartPage" component={CartPage} options={{ title: 'CartPage' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ title: 'OrderSummary' }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'map' }} />
        <Stack.Screen name="calci" component={CalCalculator} options={{ title: 'cal' }} />




      </Stack.Navigator>
    </>
  );
}
