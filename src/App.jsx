import { useRef, useState } from 'react'
import Signin from './components/Signin'
import Cookies from 'universal-cookie'
import Chat from './components/Chat';
import { Button, Card, Text, TextInput } from '@tremor/react';
import { signOut } from 'firebase/auth';
import { auth } from './utils/firebase';

function App() {
  const cookies = new Cookies();
  
  const [isLogin, setIsLogin] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const handleSignOut = () => {
    cookies.remove("auth-token");
    signOut(auth);
    window.location.reload();
  }

  if(!isLogin) {
    return (
      <Signin />
    )
  }
  
  return (
    <>
      { room ? (
        <Chat handleSignOut={handleSignOut} room={room} /> 
      ) : (
        <>
          <div className='absolute me-5 right-5'>
                <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
          <div className='roomContainer'>
              <Card className='w-96'>
                  <Text className='mb-3'>Room Name</Text>
                  <TextInput ref={roomInputRef} placeholder='Enter room name...'/>
                  <Button onClick={() => setRoom(roomInputRef.current.value)} size="xs" className='mt-2 w-16'>Join</Button>
              </Card>
          </div>
        </>
        
      )}
    </>
  )
}

export default App