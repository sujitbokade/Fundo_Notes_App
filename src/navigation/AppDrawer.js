import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screen/Home';
import Drawer from '../Components/Drawer'
import Archive from '../Screen/Archive';
import Trash from '../Screen/Trash';
import CreateLabels from '../Screen/CreateLabels';

const Drawers = createDrawerNavigator();

const AppDrawer = () => {
    return (
        <Drawers.Navigator
            drawerContent = {props => <Drawer {...props} />}
            screenOptions = {{ headerShown: false }}
            initialRouteName = "Note">
            <Drawers.Screen name = "Note" component = {Home} />
            <Drawers.Screen name = "Archive" component = {Archive} />
            <Drawers.Screen name = "Trash" component = {Trash} />
            <Drawers.Screen name = "CreateLabels" component = {CreateLabels} />
            
        </Drawers.Navigator>
    );
};

export default AppDrawer;