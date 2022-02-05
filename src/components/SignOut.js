import React from 'react';
import { auth } from '../firebase-config'


function SignOut() {
  return (
    <div className="center">
      
      <button className="signin" onClick={() => auth.signOut()}>Sign Out</button>
     
    </div>
  )
}

export default SignOut;
