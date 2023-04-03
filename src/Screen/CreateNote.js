import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput } from 'react-native-gesture-handler'


const CreateNote = () => {
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={27} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.pinButton}>
                    <MaterialCommunityIcons name="pin-outline" size={27} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="md-notifications-outline" size={27} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.archiveButton}>
                    <Ionicons name="archive-outline" size={27} />
                </TouchableOpacity>
            </View>
            <View style={styles.view1}>
                <TextInput  
                style={styles.titleText}
                placeholder='Title'
                />
                <TextInput  
                style={styles.noteText}
                placeholder='Note'
                />
            </View>
        </View>
    )
}

export default CreateNote

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        padding: 15,
        flexDirection: 'row',
        alignItems: "center"
    },
    pinButton: {
        marginLeft: 180
    },
    notificationButton: {
        marginLeft: 20
    },
    archiveButton: {
        marginLeft: 20
    },
    view1: {
        
        paddingHorizontal: 10,
        marginLeft: 8,
    },
    titleText: {
        fontSize: 25,
        marginTop: 20,
        marginBottom: -10
    },
    noteText: {
        fontSize: 18
    }
})