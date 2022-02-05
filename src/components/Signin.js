import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from '../firebase-config'


function Signin() {
    function signInWithGoogle(){
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    return (
        <div className="center">
            <button className='signin' onClick={signInWithGoogle}>Sign in With Google</button>
            <div className="creater"></div>
        </div>)
}

export default Signin;
