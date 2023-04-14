import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { addUserNotes, updateNoteData } from '../Services/NoteServices'
import { AuthContext } from '../navigation/AuthProvider';
import CreateNoteBottomSheet from '../Components/CreateNoteBottomSheet'

const CreateNote = ({ navigation, route }) => {
    const noteDetails = route.params?.item
    const [title, setTitle] = useState(noteDetails?.title || "")
    const [note, setNote] = useState(noteDetails?.note || "")
    const [pin, setPin] = useState(noteDetails?.pin || false)
    const [archive, setArchive] = useState(noteDetails?.archive || false)
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [deleted, setDeleted] = useState(noteDetails?.deleted || false);

    const { user } = useContext(AuthContext)

    const noteId = noteDetails?.id

    const onPressArrow = async () => {
        if (title === "" && note === "") {
            navigation.navigate('Drawer')
        } else {
            if (noteId) {
                await updateNoteData(title, note, pin, archive,deleted, noteId, user.uid)
                navigation.navigate('Drawer')
            } else {
                await addUserNotes(title, note, pin, archive,deleted, user.uid)
                navigation.navigate('Drawer')
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <TouchableOpacity onPress={onPressArrow} >
                    <Ionicons name="arrow-back" size={27} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pinButton}
                    onPress={() => setPin(!pin)}
                >
                    <MaterialCommunityIcons name={pin ? "pin" : "pin-outline"} size={27} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="md-notifications-outline" size={27} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.archiveButton} onPress={() => setArchive(!archive)}>
                    <MaterialCommunityIcons name={archive ? "archive-arrow-up-outline" : "archive-arrow-down-outline"} size={27} />
                </TouchableOpacity>
            </View>
            <View style={styles.view1}>
                <TextInput
                    style={styles.titleText}
                    placeholder='Title'
                    value={title}
                    onChangeText={(data) => setTitle(data)}
                />
                <TextInput
                    style={styles.noteText}
                    placeholder='Note'
                    value={note}
                    onChangeText={(data) => setNote(data)}
                />
            </View>
            <View style={styles.bottomViewTwo}>
                <TouchableOpacity >
                    <MaterialCommunityIcons
                        name="plus-box-outline"
                        color="black"
                        size={28}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.colorButton}>
                    <Ionicons name="color-palette-outline" color="black" size={28} />
                </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {setBottomSheetVisible(!bottomSheetVisible)}}>
                        <MaterialCommunityIcons
                            name="dots-vertical"
                            color="black"
                            size={28}
                        />
                    </TouchableOpacity>
            </View>
            <View>
        {bottomSheetVisible ? (
          <CreateNoteBottomSheet
            visible={bottomSheetVisible}
            onRequestClose={() => setBottomSheetVisible(false)}
            hideModal={() =>setBottomSheetVisible(false)}
            onPressDelete={() => setDeleted(!deleted)}
          />
        ) : null}
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
    },
    bottomViewTwo: {
        flex: 3,
        flexDirection: "row",
        alignItems: "flex-end",
        marginLeft: 15
    },
    colorButton: {
        marginLeft: 15,
        marginRight: 270
    }
})