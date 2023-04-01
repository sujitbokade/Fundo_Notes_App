import { Text, View, Modal, StyleSheet, Button, Pressable, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import { Avatar } from 'react-native-elements'
import { AuthContext } from '../navigation/AuthProvider';
import { fetchUserData } from '../Services/userServices';
import BottomSheet from './BottomSheet';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const imagePath = 'https://images.unsplash.com/photo-1587040164251-a349c7b1b7ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'

const Popup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { logout, user } = useContext(AuthContext)
  const [userData, setUserData] = useState('')
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetchUserData(user.uid)
    setUserData(data)
  }

  const openGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setImage(image.path)
    });
  };
  
  const openCamera = async () => {
  ImagePicker.openCamera({
    width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setImage(image.path)
  })
}

  return (
    <>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Avatar
            rounded
            size={27}
            source={
              image ? {uri:image} :{uri:imagePath}
            }
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
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Avatar
                  size='medium'
                  rounded
                  source={
                    image ? {uri:image} :{uri:imagePath}
                  }
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalText}>{userData.fullName}</Text>
            <Pressable
              style={styles.button}
              onPress={() => logout()}>
              <Text style={styles.textStyle}>Logout</Text>
            </Pressable>
          </View>
          <BottomSheet
            visible={visible}
            hide={() => setVisible(false)}
            openGallery={()=>openGallery()}
            openCamera={()=>openCamera()}
            />
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
    paddingHorizontal: 50,
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
    marginBottom: 15
  }
});

export default Popup;