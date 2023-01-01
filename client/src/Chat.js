import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './App.css';

function Chat({socket,username,roomId}) {

  const [currentMsg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  /*send the message to the server*/
  const sendMsg = async ()=>{

    if(currentMsg!==""){

        const messageData ={
            username:username,
            roomId:roomId,
            message:currentMsg,
            time:`${new Date().getHours()} : ${new Date().getMinutes()} ${new Date().getHours() < 12 ? 'AM' : 'PM'}`
        }
        await socket.emit("sendMessage",messageData);
        /*add our message to the list*/
        setMsgList((prevMsgList)=>[...prevMsgList,messageData]);
        setMsg("");
    }
  }

  

  useEffect(() => {
    socket.on("receivedMsg",(messageData)=>{
        /*add messages from other users in the room*/
        setMsgList((prevMsgList)=>[...prevMsgList,messageData]);
    });
  },[socket]);

  return (
    <div>
        <div  className='ChatHeader'>Live Chat</div>
        <div className='ChatBody'>
        <ScrollToBottom className='Chat-Body'>
        <div>{msgList.map((msg,index)=><div key={index} className={`msgContainer ${msg.username===username ? "my" : "other"}`}><p>{`${msg.username!==username ? msg.username+": ":""}${msg.message}`}<span className='msgTime'><sub>{msg.time}</sub></span></p></div>)}</div>
        </ScrollToBottom>
        </div>
        <div className='ChatFooter'>
       <span><input type="text" id="currentMsg" onKeyPress={(e)=>{e.key === 'Enter'&& sendMsg()}} onChange={(e)=>{setMsg(e.target.value)}} value={currentMsg}/>
        <button onClick={sendMsg}>send</button></span>
        </div>
    </div>
  )
}

export default Chat
