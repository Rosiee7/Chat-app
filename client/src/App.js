import './App.css';
import React, { useState } from 'react';
import { io } from "socket.io-client";
import Chat from './Chat';

  /
const socket = io.connect('http://localhost:3001');

function App() {
  const [showChat, setshowChat] = useState(false);
  const [username, setUserName] = useState("");
  const [roomId, setRoom] = useState("");


  const joinRoom = ()=>{
    if((username!=="")&&(roomId!=="")){
      socket.emit("joinRoom",roomId);
    }
    setshowChat(true);
  }

  return (
    <>
    {showChat ?
    <Chat socket={socket} username={username} roomId={roomId} />:
    <div className="App">
      <h1 className='page-title'>Join to Chat</h1>
      <div className="info">
      <p>User Name</p>
      <input type="text" id="username" onChange={(e)=>{setUserName(e.target.value)}}/>
      <p>Room Id</p>
      <input type="text" id="roomId" onChange={(e)=>{setRoom(e.target.value)}}/><br/>
      <br/><br/>
      <button onClick={joinRoom}>Enter</button>
      </div>

    </div>
    }
    </>
  )};

export default App;
