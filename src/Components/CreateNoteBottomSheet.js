import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../Utility/Themes';
const CreateNoteBottomSheet = (props) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
                onRequestClose={props.onRequestClose}
                hardwareAccelerated>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={1}
                    onPress={() => props.hideModal()}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={props.onPressDelete}>
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={22}
                                color="black"
                            />
                            <Text style={styles.text}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton}>
                            <MaterialCommunityIcons
                                name="content-copy"
                                size={22}
                                color="black"
                            />
                            <Text style={styles.text}>Make a copy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton}>
                            <MaterialCommunityIcons
                                name="share-variant-outline"
                                size={22}
                                color="black"
                            />
                            <Text style={styles.text}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton}>
                            <Feather name="user-plus" size={22} color="black" />
                            <Text style={styles.text}>Collaborator</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => props.labelPress()}>
                            <MaterialCommunityIcons
                                name="label-outline"
                                size={22}
                                color="black"
                            />
                            <Text style={styles.text}>Labels</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>

    )
}

export default CreateNoteBottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Color.Theme,
        
    },
    modalButton: {
        backgroundColor: Color.Theme,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        marginLeft: 20,
        color: 'black',
        
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});