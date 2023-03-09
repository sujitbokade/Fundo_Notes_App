import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';
import ForgetPassword from '../Screen/ForgetPassword';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} options={{header: () => null}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{header: () => null}} />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
      </Stack.Navigator>
  )
};

export default AuthStack;