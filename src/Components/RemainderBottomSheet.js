import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import moment from 'moment/moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Color } from '../Utility/Themes';

const RemainderBottomSheet = ({
    remainderBottomSheetVisible,
    setRemainderBottomSheetVisible,
    notificationDateAndTime,
    setNotificationDateAndTime,
}) => {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('');
   
    const addNotificationDateAndTime =
        (days = 0, hours = 0, minutes = 0) =>
            () => {
                const selectedDateAndTime = moment()
                    .add(days, 'days')
                    .hour(hours)
                    .minute(minutes);
                const dateAndTime = selectedDateAndTime.toISOString();

                setNotificationDateAndTime(dateAndTime);
                setRemainderBottomSheetVisible(false);
            };
    const changeNotificationDateAndTime = (event, selectedDateAndTime) => {
        setShow(false);
        let date = selectedDateAndTime.toISOString();
        setNotificationDateAndTime(date);
        setRemainderBottomSheetVisible(false);
        setShow(false);
    };
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    return (
        <View>
            <View>
                {show && (
                    <RNDateTimePicker
                        value={
                            notificationDateAndTime
                                ? new Date(notificationDateAndTime)
                                : new Date()
                        }
                        mode={mode}
                        display={'default'}
                        onChange={changeNotificationDateAndTime}
                        is24Hour={true}
                    />
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={remainderBottomSheetVisible}
                onRequestClose={() => setRemainderBottomSheetVisible(false)}
                hardwareAccelerated>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0}
                    onPress={() => setRemainderBottomSheetVisible(false)}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={addNotificationDateAndTime(0, 18, 0)}>
                            <Feather name="clock" size={25} />
                            <Text style={styles.text}>Later today</Text>
                            <Text style={styles.timeText}>6:00 pm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={addNotificationDateAndTime(1, 8, 0)}>
                            <Feather name="clock" size={25} />
                            <Text style={styles.text}>Tomorrow morning</Text>
                            <Text style={styles.timeText}>8:00 am</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={addNotificationDateAndTime(7, 8, 0)}>
                            <Feather name="clock" size={25} />
                            <Text style={styles.text}>
                                {moment().add(7, 'days').format('dddd')} morning
                            </Text>
                            <Text style={styles.timeText}>
                                {moment().add(7, 'days').format('ddd')}, 8:00 am
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                showMode('date');
                            }}>
                            <Feather name="clock" size={25} />
                            <Text style={styles.text}>Choose a date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                showMode('time');
                            }}>
                            <Feather name="clock" size={25} />
                            <Text style={styles.text}>Choose a time</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton}>
                            <Ionicons name="location-outline" size={25} />
                            <Text style={styles.text}>Choose a place</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.Theme,
        flexDirection: 'column',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#000000aa',
    },
    modalButton: {
        backgroundColor: Color.Theme,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
    },
    text: {
        marginLeft: 20,
        fontSize: 15,
        width: '63%',
    },
    timeText: {
        marginLeft: 'auto',
        fontSize: 15,
    },
});
export default RemainderBottomSheet;