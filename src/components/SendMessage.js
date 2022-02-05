import React, { useState } from 'react'
import { db, auth } from '../firebase-config'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser
        const collectionRef = collection(db, 'messages')
        await addDoc(collectionRef, {
            text: msg,
            photoURL,
            uid,
            createdAt: serverTimestamp()
        })
        
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button className="signin" style={{marginLeft : "20px"}} type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage