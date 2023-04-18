import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchNoteData } from '../Services/NoteServices';
import { AuthContext } from '../navigation/AuthProvider';
import { useIsFocused } from '@react-navigation/native';
import NoteCard from '../Components/NoteCard'
import { changeLayout } from '../Redux/Action'
import {useSelector, useDispatch} from 'react-redux';

const Trash = ({ navigation }) => {
    const [deletedNotes, setDeletedNotes] = useState([])
    const { user } = useContext(AuthContext);
    const focused = useIsFocused()
    const layout = useSelector(state => state.layout);
    const dispatch = useDispatch();

    useEffect(() => {
        if (focused) {
            deletedNoteData();
        }
    }, [deletedNoteData, focused]);

    const deletedNoteData = useCallback(async () => {
        let deletedData = []
        let noteData = await fetchNoteData(user.uid);
        noteData.forEach(data => {
            if (data.deleted) {
                deletedData.push(data)
            }
        })
        setDeletedNotes(deletedData)
    }, [user.uid])

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <FontAwesome5 name="bars" size={22} style={styles.menuButton} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, marginLeft: 30, marginTop: 10 }}>Deleted</Text>
                <TouchableOpacity>
                    <AntDesign name="search1" size={22} style={styles.searchButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(changeLayout())}>
                    <MaterialIcons name={layout ? "view-grid-outline": 'view-agenda-outline'} size={24} style={styles.layoutButton} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={deletedNotes}
                    numColumns={layout? 1: 2}
                    key={layout? 1: 2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View key={item.id} style={layout ? styles.listLayout : styles.gridLayout}>
                            <TouchableOpacity
                                onPress={() => { }}
                            >
                                <NoteCard {...item} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default Trash

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    view: {
        alignItems: "center",
        flexDirection: 'row',
    },
    menuButton: {
        marginLeft: 15,
        marginTop: 15
    },
    searchButton: {
        marginTop: 15,
        marginLeft: 170
    },
    layoutButton: {
        marginLeft: 15,
        marginTop: 15
    },
    listLayout: {
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 8,
        backgroundColor: '#f4e6f5'
    },
    gridLayout: {
        marginHorizontal: 8,
        marginVertical: 6,
        borderRadius: 10,
        padding: 12,
        width: "45%",
        borderWidth: 1,
        backgroundColor: '#f4e6f5'
      },
})