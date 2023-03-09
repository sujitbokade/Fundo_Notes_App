import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import styles from '../Utility/GlobalStyles'
import Names from '../Constants/Names'
import { AuthContext } from '../navigation/AuthProvider'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState('');
    const [checkValidPassword, setCheckValidPassword] = useState('');

    const [data, setData] = useState({
        password: '',
        secureTextEntry: true
    })

    const { login } = useContext(AuthContext)

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const handleCheckEmail = (text) => {
        setEmail(text)
        let regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexMail.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    };
    const handleCheckPassword = (text) => {
        setPassword(text)
        let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&]).{8,}$/;
        if (regexPassword.test(text)) {
            setCheckValidPassword(false);
        } else {
            setCheckValidPassword(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginTopView}>
                <Image style={styles.image}
                    source={require('../Assets/Notes_Logo.png')}
                />
                <Text style={styles.text1}>{Names.heading}</Text>
            </View>

            <View style={styles.inputView}>
                <View style={styles.input}>
                    <MaterialIcon name='alternate-email' size={20} style={{ marginRight: 5 }} />
                    <TextInput placeholder={Names.email}
                        onChangeText={text => handleCheckEmail(text)}
                        value={email}
                    />
                </View>
                {checkValidEmail ? (
                    <Text style={styles.valid}>
                        {Names.validEmail}
                    </Text>
                ) : (
                    null
                )}

                <View style={styles.input}>
                    <Ionicons name='ios-lock-closed-outline' size={20} style={{ marginRight: 5 }} />
                    <View style={{ width: 280 }}>
                        <TextInput placeholder={Names.password}
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={text => handleCheckPassword(text)}
                            value={password}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={updateSecureTextEntry} >
                            {data.secureTextEntry ?
                                <Feather name='eye-off' color='grey' size={19} />
                                : <Feather name='eye' color='grey' size={19} />}
                        </TouchableOpacity>
                    </View>
                </View>
                {checkValidPassword ? (
                    <Text style={styles.valid}>
                        {Names.validPass}
                    </Text>
                ) : (
                    null
                )}
            </View>

            <View>
                <TouchableOpacity onPress={() => login(email, password)} style={styles.loginButton}>
                    <Text style={styles.loginText}>{Names.loginButton}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity 
                style={{ marginBottom: 150 }}
                onPress={() => navigation.navigate('ForgetPassword')}
                >
                    <Text style={styles.forgetButton}>{Names.forgetPass}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomView}>
                <Text style={{ fontSize: 14, color: '#000' }}>{Names.account}</Text>
                <TouchableOpacity>
                    <Text style={{ fontSize: 15, color: '#AD40AF' }}
                        onPress={() => navigation.navigate('SignUp')}> {Names.signUp}</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
export default Login;



