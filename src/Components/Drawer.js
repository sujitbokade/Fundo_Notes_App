import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Names from '../Constants/Names'
import Sizes from '../Constants/Sizes';

class Drawer extends Component {
    constructor() {
        super();
    }
    render(props) {
        return (
            <View style={styles.container}>
                <DrawerContentScrollView {...props} style={styles.drawer}>
                    <View style={styles.logoView}>
                        <Text style={styles.logoText}>{Names.heading}</Text>
                    </View>
                    <View style={styles.labelView}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("Note")}}>
                            <Icon
                                style={styles.icon}
                                name="bulb-outline"
                                size={Sizes.normalButton}
                                color={'black'}
                            />
                            <Text style={styles.labelText}>{Names.notes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon
                                style={styles.icon}
                                name="notifications-outline"
                                size={Sizes.normalButton}
                                color={'black'}
                            />
                            <Text style={styles.labelText}>{Names.remainder}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon
                                style={styles.icon}
                                name="add-outline"
                                size={Sizes.normalButton}
                                color={'black'}
                            />
                            <Text style={styles.labelText}>{Names.label}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon
                                style={styles.icon}
                                name="archive-outline"
                                size={Sizes.normalButton}
                                color={'black'}
                            />
                            <Text style={styles.labelText}>{Names.archive}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon
                                style={styles.icon}
                                name="trash-outline"
                                size={Sizes.normalButton}
                                color={'black'}
                            />
                            <Text style={styles.labelText}>{Names.deleted}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Icon
                                style={styles.icon}
                                name="settings-outline"
                                size={Sizes.normalButton}
                                color={'black'}
                            />
                            <Text style={styles.labelText}>{Names.setting}</Text>
                        </TouchableOpacity>    
                    </View>
                    <View style= {styles.logoutView}>
                    <TouchableOpacity style={styles.logout} >
                            <MaterialCommunityIcons
                                style={styles.icon}
                                name="logout"
                                size={Sizes.normalButton}
                                color={'black'}
                            />
                            <Text style={styles.labelText}>{Names.logout}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </DrawerContentScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawer: {
        backgroundColor: 'white',
    },
    logoView: {
        margin: 23,
        marginLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        
    },
    logoText: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    labelView: {
        alignItems: 'flex-start',
        marginLeft: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        
    },
    labelText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        margin: 10,
        color: 'black',
    },
    button: {
        flexDirection: 'row',
    },

    icon: {
        marginTop: 10,
        margin: 10,
    },
    logout: {
        flexDirection:'row',
    },
    logoutView: {
        marginLeft: 20,
        marginTop: 20,

    }
});
export default Drawer;