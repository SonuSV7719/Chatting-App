import './App.css';
import Chat from './components/Chat';
import Signin from './components/Signin';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase-config'



function App() {
  const [user] = useAuthState(auth)
  console.log(process.env)
  return (
    <>
      <h1 className='heading'>Welcome to ChatWithMe</h1>
      {user ? <Chat /> : <Signin />}

    </>
  );
}

export default App;
