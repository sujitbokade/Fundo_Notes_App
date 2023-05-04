import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchLabelData } from '../Services/LabelServices';
import CheckBox from '../Components/CheckBox';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthProvider';
import { labelsData } from '../Redux/Action';
import { useSelector, useDispatch } from 'react-redux';
import Names from '../Constants/Names';

const AddLabelsInNote = ({ navigation, route }) => {
    const focused = useIsFocused()
    const { user } = useContext(AuthContext)
    const labelData = useSelector(state => state.labelData);
    const [checkedLabels, setCheckedLabels] = useState(labels || []);
    const dispatch = useDispatch();
    const labels = route.params?.labelData;
    const noteId = route.params?.noteId;

    const fetchData = useCallback(async () => {
        const data = await fetchLabelData(user.uid)
        dispatch(labelsData(data));   
    }, [user.uid, dispatch])
  
    useEffect(() => {
        if (focused) {
            fetchData();
        }
    }, [focused, fetchData]);

    const handleCheck = data => () => {
        if (!checkedLabels.find(element => element.id === data.id)) {
            setCheckedLabels([...checkedLabels, data]);
        } else {
            let temp = checkedLabels.filter(element => element.id !== data.id);
            setCheckedLabels(temp);
        }
    };

    const isChecked = data => {
        return checkedLabels.find(element => element.id === data.id);
    };
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CreateNote', {
                        checkedLabelsData: checkedLabels,
                        noteId: noteId,
                    })
                }}>
                    <Ionicons name="arrow-back" size={25} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder={Names.labelName}
                    onChangeText={() => {}}
                />
            </View>
            <ScrollView>
                <View style={{ marginTop: 5 }}>
                    {labelData.map(item => (
                        <CheckBox
                            key={item.id}
                            item={item}
                            checked={isChecked(item)}
                            unchecked={handleCheck(item)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default AddLabelsInNote

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        marginLeft: 5,
        marginTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        paddingLeft: 10,
    },
    textInput: {
        marginHorizontal: 20,
        width: '80%',
        color: "black",
        fontSize: 18
    },
});