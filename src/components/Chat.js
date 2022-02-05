import React, { useEffect, useState, useRef } from 'react'
import SendMessage from './SendMessage'
import SignOut from './SignOut'
import { db, auth } from '../firebase-config'
import { collection, orderBy, query, limit, onSnapshot } from 'firebase/firestore'
import notification from '../static/notification.mp3'
import DeleteChat from './DeleteChat'


function Chat() {
    const scroll = useRef()
    const [chat, setChat] = useState([]);
 
    useEffect(()=>{
        const collectionRef = collection(db, "messages");
        const dataOrdered =  query(collectionRef, orderBy("createdAt"), limit(50))
        onSnapshot(dataOrdered, (snapshot)=>{
            setChat(snapshot.docs.map(doc => doc.data()))
            })
    }, [])

    
    const audio = new Audio(notification)

   const play = ()=>{
       chat.map(({uid})=>{
           if (uid===auth.currentUser.uid){
            return audio.pause()
           }
           else{
                return audio.play()
           }
       })

   }

   play();
 
    return (
        <>
            <div className='buttons'>
            <SignOut />
            <DeleteChat />
            </div>
            

            <div className="msgs">
                {chat.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}> 
                            <img src={photoURL} alt="" />
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>

           
        </>
    );
}

export default Chat;