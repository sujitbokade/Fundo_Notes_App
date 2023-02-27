import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} options={{header: () => null}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{header: () => null}} />
      </Stack.Navigator>
  )
};

export default AuthStack;