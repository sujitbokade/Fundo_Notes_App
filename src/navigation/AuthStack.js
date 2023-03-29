import React,{useEffect}from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';
import ForgetPassword from '../Screen/ForgetPassword';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '89621212132-meagqoe0tcis90h061bho7m7recva6t0.apps.googleusercontent.com',
    });
  }, []);
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} options={{header: () => null}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{header: () => null}} />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
      </Stack.Navigator>
  )
};

export default AuthStack;