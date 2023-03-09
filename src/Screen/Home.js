import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles from '../Utility/GlobalStyles'
import { AuthContext } from '../navigation/AuthProvider';
import Bottombar from '../Components/BottomBar';
import TopBar from '../Components/TopBar';

const Home = ({navigation}) => {

  const { logout } = useContext(AuthContext)

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <View style={{marginBottom:300}}>
        <TopBar onPress={()=> {navigation.openDrawer()}} />
      </View>
      <View style={{ marginBottom: 218, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => logout()} style={styles.loginButton}>
          <Text style={styles.loginText}> Sign-Out </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Bottombar />
      </View>
    </View>
  )
}

export default Home
