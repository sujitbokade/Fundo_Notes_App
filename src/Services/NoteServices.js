import fireStore from '@react-native-firebase/firestore'


export const addUserNotes = async (title, note, pin, archive, user) => {
    await fireStore().collection('Users').doc(user).collection("Notes").add({ title, note, pin, archive })
     
}

export const fetchNoteData = async (user) => {
    try {
        const noteData = [];
        await fireStore().collection('Users').doc(user).collection('Notes').get().then(data => {
            data.forEach(data => {
                const details = data.data()
                details.id = data.id
                noteData.push(details)   
            })
        })
        return noteData;
    } catch (e) {
        console.log(e);
    }
};

export const updateNoteData = async (title,note, pin, archive, noteId, user) => {
    try {
        await fireStore().collection('Users').doc(user).collection('Notes').doc(noteId)
        .update({
            title: title,
            note: note,
            pin: pin,
            archive: archive
          });
    } catch(e){
        console.log(e)
    }
   
  };