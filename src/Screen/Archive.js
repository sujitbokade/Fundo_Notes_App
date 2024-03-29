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

const Archive = ({navigation}) => {
    const [archiveNotes, setArchiveNotes] = useState([])
    const { user } = useContext(AuthContext);
    const focused = useIsFocused()
    const layout = useSelector(state => state.layout);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (focused) {
            archiveNoteData();
        }
    }, [archiveNoteData, focused]);

    const archiveNoteData = useCallback(async () => {
        let archiveData = []
        let noteData = await fetchNoteData(user.uid);
        noteData.forEach(data => {
            if (data.archive) {
                archiveData.push(data)
            }
        })
        setArchiveNotes(archiveData)
    }, [user.uid])

    const editNote = (item) => {
        navigation.navigate("CreateNote", { item: item })
       
      }
    return (
        <View style={styles.container}>
            <View style={styles.view}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome5 name="bars" size={22} style={styles.menuButton} />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, marginLeft: 30, marginTop: 10, marginRight:"43%" }}>Archive</Text>
            <TouchableOpacity>
                <AntDesign name="search1" size={22} style={styles.searchButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(changeLayout())}>
                <MaterialIcons name={layout ? "view-grid-outline": 'view-agenda-outline'} size={24} style={styles.layoutButton} />
            </TouchableOpacity>
            </View>
            <View style={{marginTop:20}}>
                <FlatList
                    data={archiveNotes}
                    numColumns={layout ? 1 : 2}
                    key={layout ? 1 : 2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View key={item.id} style={layout ? styles.listLayout : styles.gridLayout}>
                            <TouchableOpacity
                             onPress={() => {
                                editNote(item);
                              }}
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

export default Archive

const styles = StyleSheet.create({
    container: {
        flex:1
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
        marginRight: "3%",
        
    },
    layoutButton: {
        marginLeft: "1%",
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