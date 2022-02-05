import React from 'react'
import {getDocs, query, collection, deleteDoc, orderBy, limit, doc} from 'firebase/firestore'
import {db} from '../firebase-config'

function DeleteChat(){

    const DeleteAll = async ()=>{
        const collectionRef = collection(db, "messages");
        const dataOrdered =  query(collectionRef, orderBy("createdAt"), limit(50))
        const snapshot = await getDocs(dataOrdered)
        const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        result.forEach(async (data)=>{
            const docRef = doc(db, "messages", data.id)
            await deleteDoc(docRef)
        })
    }

    return (
        <button className="signin" style={{margin: "20px"}} onClick={DeleteAll}>Delete All Chats</button>
    )
}

export default DeleteChat;