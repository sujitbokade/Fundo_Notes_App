import fireStore from '@react-native-firebase/firestore'

export const addUserData = async (fullName, email, user) => {
    await fireStore().collection('Users').doc(user).set({fullName, email})
}

export const fetchUserData = async (user) => {
    let userData = [];
     await fireStore().collection('Users').doc(user.uid).get().then (data=>{
        const fullName = data.data().fullName
        const image = data.data().image
        userData.push(fullName)
        userData.push(image)
        console.log(fullName)
        console.log(image)
        console.log(data.data())
     })
     return userData
}

export const updateUserData = async (user, image) => {
    await fireStore().collection('Users').doc(user.uid).update({image});
  };