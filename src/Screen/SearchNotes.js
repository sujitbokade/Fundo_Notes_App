import { View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchNoteData } from '../Services/NoteServices';
import { AuthContext } from '../navigation/AuthProvider';
import { useSelector } from 'react-redux';
import NoteCard from '../Components/NoteCard';
import { Color } from '../Utility/Themes';

const SearchNotes = ({ navigation }) => {
    const [noteData, setNoteData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const isFocused = useIsFocused();
    const { user } = useContext(AuthContext);
    const layout = useSelector(state => state.layout);
    const fetchData = useCallback(async () => {
        let data = await fetchNoteData(user.uid);
        setNoteData(data);
    }, [user.uid]);

    const getSearchTerm = text => {
        const searchedData = noteData.filter(
            (item) =>
                item.title?.toUpperCase()?.includes(text.toUpperCase()) ||
                item.note?.toUpperCase()?.includes(text.toUpperCase())
        );
        setSearchData(searchedData);
    };
    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [fetchData, isFocused]);
    const editNotes = item => {
        navigation.navigate('CreateNote', {
            item: item,
            noteId: item.id,
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search your notes"
                    onChangeText={text => getSearchTerm(text)}
                    autoFocus={true}
                />
            </View>
            <View style={{ flex: 1 }}>
                <View>
                    <FlatList
                        style={styles.list}
                        data={searchData}
                        numColumns={layout ? 1 : 2}
                        key={layout ? 1 : 2}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={layout ? styles.listLayout : styles.gridLayout }
                                onPress={() => {
                                    editNotes(item);
                                }}>
                                <NoteCard {...item} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: Color.Theme,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 20,
        marginLeft: 20,
        width: '80%',
    },
    list: {
        paddingLeft: 10,
        paddingRight: 10,
    },

    listLayout: {
        backgroundColor: '#f4e6f5',
        margin: 7,
        borderColor: Color.Theme,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    gridLayout: {
        backgroundColor: '#f4e6f5',
        margin: '2.5%',
        borderColor: Color.Theme,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: '45%',
    },
});

export default SearchNotes