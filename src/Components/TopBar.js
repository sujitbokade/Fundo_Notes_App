import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Sizes from '../Constants/Sizes'
import Names from '../Constants/Names'
import Popup from './Popup'


const TopBar = props => {

    return (
        <View style={styles.container}>
            <View style={styles.barStyle}>
                <TouchableOpacity onPress={props.onPress}>
                    <FontAwesome5 name='bars'
                        size={Sizes.smallButton}
                        color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.search}>
                <TouchableOpacity>
                    <Text style={{ fontSize: 18 }}>{Names.search}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.grid}>
                <TouchableOpacity>
                    <Feather name="grid" color={'black'} size={25} />
                </TouchableOpacity>
            </View>
            <View>
            <Popup/>
            </View>  
        </View>
    )
}

export default TopBar;

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: '#eacceb',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 25,
        margin: 10,
        padding: 8,
    },
    barStyle: {
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 28,
    },
    search: {
        marginRight: 60,
    },
    grid: {
        marginRight: 10
    },
})