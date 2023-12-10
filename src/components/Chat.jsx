import { Button, Card, Divider, Text, TextInput, Title } from '@tremor/react'
import { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../utils/firebase';

function Chat({ room, handleSignOut }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessage = query(messagesRef, where("room", "==", room), orderBy("createdAt"))
        const unscribe = onSnapshot(queryMessage, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({
                    ...doc.data(), 
                    id: doc.id,
                });
            })
            console.log(messages)
            setMessages(messages)
        })

        return () => unscribe();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message == "") {
            return;
        }
        try {
            await addDoc(messagesRef, {
                text: message,
                createdAt: serverTimestamp(),
                author: auth.currentUser.displayName,
                room,
            });
        } catch(err) {
            console.error(err)
        }

        setMessage("");
    }

    

  return (
    <>
        
        <div className='chatContainer'>
            <Card className='lg:w-4/6 w-full lg:h-5/6 h-full'>  
                <div className='flex content-center justify-between'>
                    <Title>Room: <Text className='inline-block'>{room}</Text></Title>
                    <Button size='xs' onClick={handleSignOut}>Sign Out</Button>
                </div>
                <Divider className='mb-0'></Divider>
                <div className='overflow-auto h-5/6'>
                    {messages.map((message) => (
                        <div key={message.id} className='bg-tremor-background-muted dark:bg-tremor-background-emphasis mb-2 p-2 mx-2 rounded-lg'>
                            <Text>{message.author}</Text>
                            <Title>{message.text}</Title>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className='mt-10 flex w-full'>
                    <TextInput value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter your message...' className='me-2' />
                    <Button type='submit'>
                        <i class="fa-solid fa-paper-plane"></i>
                    </Button>
                </form>
            </Card>
        </div>
    </>
    
  )
}

export default Chat