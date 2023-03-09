import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import styles from '../Utility/GlobalStyles'
import Names from '../Constants/Names'
import { AuthContext } from '../navigation/AuthProvider'

const SignUp = (props) => {
    const [isError, setIsError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const [passData, setPassData] = useState({
        secureTextEntry: true
    })
    const [conPassData, setConPassData] = useState({
        secureTextEntry: true
    })

    const { register } = useContext(AuthContext)

    const checkValidation = (text) => {
        const confirmPass = text
        setConfirmPass(text)
        if (password != confirmPass) {
            setIsError("Confirm Password should be match with Password")
        } else {
            setIsError("")
        }
    }

    const updateSecureTextEntryP = () => {
        setPassData({
            passData,
            secureTextEntry: !passData.secureTextEntry
        })
    }
    const updateSecureTextEntryCP = () => {
        setConPassData({
            conPassData,
            secureTextEntry: !conPassData.secureTextEntry
        })
    }

    return (
        <View>
            <Text style={styles.signTopView}>{Names.registration}</Text>

            <View style={styles.signUpInputView}>
                <View style={styles.input}>
                    <Ionicons name='person-outline' size={20} style={{ marginRight: 5 }} />
                    <TextInput placeholder='user full name'
                    />

                </View>
                <View style={styles.input}>
                    <MaterialIcon name='alternate-email' size={20} style={{ marginRight: 5 }} />
                    <TextInput placeholder={Names.email}
                        value={email}
                        onChangeText={(data) => setEmail(data)}
                    />
                </View>

                <View style={styles.input}>
                    <Ionicons name='ios-lock-closed-outline' size={20} style={{ marginRight: 5 }} />
                    <View style={{ width: 280 }}>
                        <TextInput placeholder={Names.password}
                            secureTextEntry={passData.secureTextEntry ? true : false}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={updateSecureTextEntryP}  >
                            {passData.secureTextEntry ?
                                <Feather name='eye-off' color='grey' size={19} />
                                : <Feather name='eye' color='grey' size={19} />}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.input}>
                    <Ionicons name='ios-lock-closed-outline' size={20} style={{ paddingRight: 5 }} />
                    <View style={{ width: 280 }}>
                        <TextInput placeholder={Names.confirmPass}
                            secureTextEntry={conPassData.secureTextEntry ? true : false}
                            onChangeText={(text) => checkValidation(text)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={updateSecureTextEntryCP}  >
                            {conPassData.secureTextEntry ?
                                <Feather name='eye-off' color='grey' size={19} />
                                : <Feather name='eye' color='grey' size={19} />}
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.valid}>{isError}</Text>

            </View>
            <View style={styles.signUpButton}>
                <TouchableOpacity onPress={() => register(email, password)} style={styles.loginButton}>
                    <Text style={styles.loginText}>{Names.signUpButton}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomView}>
                <Text style={{ fontSize: 14, color: '#000' }}>{Names.alreadyReg}</Text>
                <TouchableOpacity>
                    <Text style={{ fontSize: 15, color: '#AD40AF' }}
                        onPress={() => props.navigation.navigate('Login')}> {Names.loginButton}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp