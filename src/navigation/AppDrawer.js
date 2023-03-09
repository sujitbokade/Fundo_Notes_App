import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screen/Home';
import Drawer from '../Components/Drawer'

const Drawers = createDrawerNavigator();

const AppDrawer = () => {
    return (
        <Drawers.Navigator
            drawerContent = {props => <Drawer {...props} />}
            screenOptions = {{ headerShown: false }}
            initialRouteName = "Note">
            <Drawers.Screen name = "Note" component = {Home} />
        </Drawers.Navigator>
    );
};

export default AppDrawer;