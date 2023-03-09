import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React,{useState, useContext} from 'react'
import styles from '../Utility/GlobalStyles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Names from '../Constants/Names'
import { AuthContext } from '../navigation/AuthProvider'

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState('');
    const { forgetPassword } = useContext(AuthContext)

    const handleCheckEmail = (text) => {
        setEmail(text)
        let regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexMail.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    };
    return (
        <View style={{paddingHorizontal: 20}} >
            <View style={styles.loginTopView}>
                <Image style={styles.forgotImage}
                    source={require('../Assets/forgot-password.png')}
                />
            </View>
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
            <View style={{marginTop:40}}>
                <TouchableOpacity onPress={() => forgetPassword(email)} style={styles.loginButton}>
                    <Text style={styles.loginText}>{Names.submit}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ForgetPassword