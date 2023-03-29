import { Text, View, Modal, StyleSheet, Button, Pressable, TouchableOpacity } from 'react-native'
import React, {useState,useContext } from 'react';
import { Avatar } from 'react-native-elements'
import { AuthContext } from '../navigation/AuthProvider';

const Popup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useContext(AuthContext)
  return (
    <>
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Avatar
          rounded
          size={27}
          source={{
            uri:'https://images.unsplash.com/photo-1587040164251-a349c7b1b7ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'
              
          }}
        />
      </TouchableOpacity>
      </View>
      {modalVisible && (
        <Modal animationType="fade" transparent={true} visible={true}>
          <TouchableOpacity
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}></TouchableOpacity>
          <View style={styles.modalView}>
            <View style={styles.modalAvatar}>
          <Avatar
          size='medium'
          rounded
          source={{
            uri:'https://images.unsplash.com/photo-1587040164251-a349c7b1b7ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'
              
          }}
        />
        </View>
            <Text style={styles.modalText}>Username</Text>
            <Pressable
              style={styles.button}
              onPress={() => logout()}>
              <Text style={styles.textStyle}>Logout</Text>
            </Pressable>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal:50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    top: '20%',
    left: '25%'
  },
  button: {
    borderRadius: 8,
    padding: 6,
    elevation: 2,
    backgroundColor: "#AD40AF"
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: "black"
  },
  modalAvatar: {
    marginBottom:15
  }
});

export default Popup;