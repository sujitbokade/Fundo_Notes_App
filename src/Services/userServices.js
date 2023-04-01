import fireStore from '@react-native-firebase/firestore'

export const addUserData = async (fullName, email, user)=> {
    await fireStore().collection('Users').doc(user).set({fullName, email})
}

export const fetchUserData = async (user) => {
    let userData;
     await fireStore().collection('Users').doc(user).get().then (data=>{
        const item = data.data() 
        userData = item
     })
     return userData
}