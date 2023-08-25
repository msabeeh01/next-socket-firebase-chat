
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { signOut } from 'firebase/auth';

//local imports 
import withAuth from '../../utils/withAuth';
import { auth } from '../../lib/firebaseConfig';


const URL = 'http://localhost:3000';
const socket = io(URL);



function Home() {
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);



  const handleRoom = async () => {
    try {
      if (room) {
        await socket.emit('join', room);
        setShowChat(true);
      }
    } catch (error) {
      alert("error: ", error)
    }
  }

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className='container'>
      <div className='m-10 text-center'>
        <div className='border-solid border-2 p-5 rounded-sm bg-gray-200 flex flex-col gap-2'>
          <h1>Home</h1>
          <input type="text" onChange={(e) => setRoom(e.target.value)} />
          <button className='border-2 border-solid rounded-lg bg-blue-500 p-3 text-white' onClick={handleRoom}>join room</button>
        </div>
        {showChat ? <ChatComp roomID={room} /> : <p>NO CHAT</p>}
        <button className='border-2 border-solid rounded-lg bg-blue-500 p-3 text-white' onClick={() => { socket.emit('leave', room); setRoom(''); setShowChat(false) }}>leave room</button>
      </div>

      <button onClick={handleSignout}>Log out</button>

    </div>
  )
}

const ChatComp = ({ roomID }) => {
  const [room, setRoom] = useState(roomID)
  const [sentMessage, setSentMessage] = useState('')
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();

    // Listen for 'message' event from socket
    socket.on('msg', (data) => {
      // Update messages when a new message is received
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  const fetchMessages = async () => {
    try {
      //fetch messages from db
      const res = await axios.get(`http://localhost:3000/messages/find/${roomID}`)
      console.log(res.data)
      setMessages(res.data)
    } catch (e) {
      console.log(e)
    }
  }


  const handleMessage = async () => {
    try {
      var data = {
        room: room,
        msg: sentMessage,
        user: auth.currentUser.uid,
        username: auth.currentUser.displayName
      }
      await socket.emit('message', data);
      await fetchMessages()
    } catch (error) {
      alert("error: ", error)
    }
  }

  return (
    <div className='flex flex-col bg-gray-200 gap-2'>
      {room ? room : <h1>no room joined</h1>}
      <input type="text" onChange={(e) => setSentMessage(e.target.value)} />
      <button className='border-2 border-solid rounded-lg bg-blue-500 p-3 text-white' onClick={handleMessage}>send message</button>

      {
        messages.map((msg, i) => {
          return (
            <div key={i}>
              {msg.user === auth.currentUser.uid ?
                (
                  <div className='msgYou'>
                    <h2>{msg.username}: </h2>
                    <p>{msg.msg}</p>
                  </div>
                ) :
                (
                  <div className='msgThem'>
                    <h2>{msg.username}: </h2>
                    <p>{msg.msg}</p>
                  </div>
                )}
            </div>
          )
        })
      }
    </div>
  )
}


export default withAuth(Home);