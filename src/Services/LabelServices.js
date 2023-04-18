import fireStore from '@react-native-firebase/firestore'


export const addUserLabels = async (label, user) => {
    await fireStore().collection('Users').doc(user).collection("Labels").add({ label })   
}

export const fetchLabelData = async (user) => {
    try {
        const labelData = [];
        await fireStore().collection('Users').doc(user).collection('Labels').get().then(data => {
            data.forEach(data => {
                const details = data.data()
                details.id = data.id
                labelData.push(details)   
            })
        })
        return labelData;
    } catch (e) {
        console.log(e);
    }
};

export const updateLabelData = async (label, user, labelId) => {
    try {
        await fireStore().collection('Users').doc(user).collection('Labels').doc(labelId)
        .update({
           label: label
          });
    } catch(e){
        console.log(e)
    }
   
  };

  export const deleteLabelData = async (user, labelId) => {
    try {
      await fireStore().collection('Users').doc(user).collection('Labels').doc(labelId).delete();
    } catch (e) {
      console.log(e);
    }
  };