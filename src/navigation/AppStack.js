import React from "react";
import {createStackNavigator} from '@react-navigation/stack'
import AppDrawer from "./AppDrawer";


const stack = createStackNavigator();

const AppStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name='Drawer' component={AppDrawer} options={{header: () => null}}/>
        </stack.Navigator>
    )
}

export default AppStack;