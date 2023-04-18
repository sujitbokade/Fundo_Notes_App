import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useContext } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';
import { updateLabelData, deleteLabelData } from '../Services/LabelServices';

const LabelCard = ({item, fetchData}) => {
    const [icon, setIcon] = useState(true)
    const [label, setLabel] = useState(item.label);
    const { user } = useContext(AuthContext)

    const editLabel = async () => {
        const labelId = item.id;
        console.log("edit successfully");
        setIcon(!icon);
        if (label !== '') {
          await updateLabelData(label, user.uid, labelId);
          await fetchData();
        }
      };

      const deleteLabel = async () => {
        const labelId = item.id;
        await deleteLabelData(user.uid, labelId);
        await fetchData();
      };
    
    return (
        <View style={icon ? null : styles.container}>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => {deleteLabel()}}>
                    <MaterialCommunityIcons
                        name={icon ? 'label-outline' : 'trash-can-outline' }
                        size={25}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.labelText}
                    autoFocus={true}
                    onPressIn={() => setIcon(false)}
                    onEndEditing={() => setIcon(true)}
                    value={label}
                    onChangeText={text => setLabel(text)}
                />
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            editLabel();
                        }}>
                        <MaterialCommunityIcons
                            name={icon ? 'pencil' : 'check'}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LabelCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    view: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    labelText: {
        fontSize: 20,
        marginLeft: 25,
        marginRight: 10,
        width: '75%',
    } 
});