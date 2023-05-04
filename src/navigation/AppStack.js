import React from "react";
import {createStackNavigator} from '@react-navigation/stack'
import AppDrawer from "./AppDrawer";
import CreateNote from "../Screen/CreateNote";
import AddLabelsInNote from "../Screen/AddLabelsInNote";
import TrashNote from "../Screen/TrashNote";
import SearchNotes from "../Screen/SearchNotes";


const stack = createStackNavigator();

const AppStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name='Drawer' component={AppDrawer} options={{header: () => null}}/>
            <stack.Screen name='CreateNote' component={CreateNote} options={{header: () => null}} />
            <stack.Screen name='AddLabelsInNote' component={AddLabelsInNote} options={{header: () => null}} />
            <stack.Screen name='TrashNote' component={TrashNote} options={{header: () => null}} />
            <stack.Screen name='SearchNotes' component={SearchNotes} options={{header: () => null}} />
           
        </stack.Navigator>
    )
}

export default AppStack;