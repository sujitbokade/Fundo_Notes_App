import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles from '../Utility/GlobalStyles'
import { AuthContext } from '../navigation/AuthProvider';

const Home = () => {

  const {logout} = useContext(AuthContext)

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }}>
      <Text style={{ fontSize: 25, marginBottom:20 }}>Home</Text>
      <TouchableOpacity onPress={() => logout()} style={styles.loginButton}>
        <Text style={styles.loginText}> Sign-Out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home