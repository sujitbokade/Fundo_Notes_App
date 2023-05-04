import { View, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { addUserNotes, updateNoteData } from '../Services/NoteServices'
import { AuthContext } from '../navigation/AuthProvider';
import CreateNoteBottomSheet from '../Components/CreateNoteBottomSheet'
import Chip from '../Components/Chip'
import RemainderBottomSheet from '../Components/RemainderBottomSheet'
import moment from 'moment'
import PushNotification from "react-native-push-notification"


const CreateNote = ({ navigation, route }) => {
    const noteDetails = route.params?.item
    const [title, setTitle] = useState(noteDetails?.title || "")
    const [note, setNote] = useState(noteDetails?.note || "")
    const [pin, setPin] = useState(noteDetails?.pin || false)
    const [archive, setArchive] = useState(noteDetails?.archive || false)
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [deleted, setDeleted] = useState(noteDetails?.deleted || false);
    const [remainderBottomSheetVisible, setRemainderBottomSheetVisible] = useState(false);
    const [notificationDateAndTime, setNotificationDateAndTime] = useState(noteDetails?.notificationDateAndTime || '');
    const { user } = useContext(AuthContext)

    useEffect(() => {
        createChannels();
      }, []);

    const noteId = noteDetails?.id

    let labelData = route.params?.checkedLabelsData || noteDetails?.labelData || [];

    const onPressArrow = async () => {
        if (title === "" && note === "") {
            navigation.navigate('Drawer')
        } else {
            if (noteId) {
                await updateNoteData(title, note, pin, archive, deleted, labelData, notificationDateAndTime, noteId, user.uid)
                navigation.navigate('Drawer')
            } else {
                await addUserNotes(title, note, pin, archive, deleted, labelData, notificationDateAndTime, user.uid)
                navigation.navigate('Drawer')
            }
           
            notificationDateAndTime ? handleNotification() : null;
            navigation.navigate('Drawer')
            
        }

    }

    const createChannels = () => {
        PushNotification.createChannel(
          {
            channelId: 'Remainders',
            channelName: 'Remainder Notification',
            channelDescription: 'Reminder for any task',
          },
          () => {},
        );
      };
      const handleNotification = () => {
        PushNotification.localNotificationSchedule({
          id: moment(notificationDateAndTime).unix(),
          channelId: 'Remainders',
          title: title,
          message: note,
          date: moment(notificationDateAndTime).toDate(),
        });
      };
      const cancelNotification = () => {
        setNotificationDateAndTime(null);
        PushNotification.cancelLocalNotification(
          moment(notificationDateAndTime).unix(),
        );
      };
      


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
                <TouchableOpacity style={styles.notificationButton} onPress={() =>
                    setRemainderBottomSheetVisible(!remainderBottomSheetVisible)
                }>
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
            <View style={styles.labelStyle}>
                {notificationDateAndTime ? (
                    <View style={styles.notificationChip}>
                        <View style={styles.notificationContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    setRemainderBottomSheetVisible(
                                        !remainderBottomSheetVisible,
                                    );
                                }}>
                                <MaterialCommunityIcons
                                    name="alarm"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Text style={styles.notificationText}>
                                {notificationDateAndTime
                                    ? moment(notificationDateAndTime).format('lll')
                                    : null}
                            </Text>
                            <TouchableOpacity
                                onPress={() => { cancelNotification() }}>
                                <MaterialCommunityIcons
                                    name="close"
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {labelData.map(item => (
                    <Chip key={item.id}>{item.label}</Chip>
                ))}
            </View>
            <View style={styles.bottomViewTwo}>
                <View style={{ flexDirection: "row", flex: 2 }}>
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
                </View>
                <View style={{}}>
                    <TouchableOpacity
                        onPress={() => { setBottomSheetVisible(!bottomSheetVisible) }}>
                        <MaterialCommunityIcons
                            name="dots-vertical"
                            color="black"
                            size={28}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {bottomSheetVisible ? (
                    <CreateNoteBottomSheet
                        visible={bottomSheetVisible}
                        onRequestClose={() => setBottomSheetVisible(false)}
                        hideModal={() => setBottomSheetVisible(false)}
                        onPressDelete={() => setDeleted(!deleted)}
                        labelPress={() => navigation.navigate("AddLabelsInNote")}
                    />
                ) : null}
            </View>
            <View>
                <RemainderBottomSheet
                    remainderBottomSheetVisible={remainderBottomSheetVisible}
                    setRemainderBottomSheetVisible={setRemainderBottomSheetVisible}
                    notificationDateAndTime={notificationDateAndTime}
                    setNotificationDateAndTime={setNotificationDateAndTime}
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
        marginLeft: "60%"
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
        marginLeft: 15,
        marginRight: 10

    },
    colorButton: {
        marginLeft: 15,

    },
    labelStyle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    notificationChip: {
        borderRadius: 20,
        backgroundColor: '#d5c5d6',
        padding: 8,
        margin: 10,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationText: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
    },
})