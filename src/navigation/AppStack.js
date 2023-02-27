import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screen/Home";

const stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name='Home' component={Home}/>
        </stack.Navigator>
    )
}

export default AppStack;