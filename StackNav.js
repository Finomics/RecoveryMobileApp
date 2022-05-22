import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splashscreen from './screens/Splashscreen';
import Home from './screens/Home';
import Form from './screens/Form';
import Flashlight from './screens/Flashlight';
import RealtimeSearch from './screens/RealtimeSearch';
import uploadImage from './screens/UploadImage';
import Otp from './screens/Otp';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="splash" component={Splashscreen} />
      <Stack.Screen name="form" component={Form} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="flashlight" component={Flashlight} />
      <Stack.Screen name="RealtimeSearch" component={RealtimeSearch} />
      <Stack.Screen name="uploadImage" component={uploadImage} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
}
