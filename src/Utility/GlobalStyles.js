import { StyleSheet } from 'react-native';
import {Color} from './Themes'


const styles = StyleSheet.create({
    container: {
        flex:3 ,
    },
    loginTopView: {
        alignItems: 'center',
        marginBottom: 40
    },
    signTopView: {
        fontSize: 30,
        marginTop: 30,
        marginBottom: 28,
        paddingHorizontal: 15,
        color: '#2c3e50'
    },
    input: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        alignItems: 'center',
        marginBottom: 10,
    }, 
    image: {
        height: 130,
        width: 130,
        marginTop: 40
    },
    forgotImage: {
        height: 200,
        width: 200,
        marginTop: 10
    },
    text1: {
        fontSize: 28,
        color: '#2c3e50'
    },
    inputView: {
        paddingHorizontal: 20,
        marginBottom: 25
    },
    signUpInputView: {
        paddingHorizontal: 15,
        marginBottom: 30
    },
    loginButton: {
        backgroundColor:Color.Button,
        padding: 12,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 15
    },
    signUpButton: {
        marginBottom: 200
    },

    loginText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
        color: '#fff'
    },
    forgetButton: {
        fontSize: 14,
        textAlign: 'center',
        color: Color.Link ,
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    valid: {
        color: Color.Errors,
        marginLeft: 15
    },
    googleText: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
        color: Color.googleText,
        
    },
    googleButton: {
        backgroundColor:Color.googleBackground,
        padding: 12,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        marginBottom:50,
        flexDirection: 'row',
        
    },

});

export default styles;