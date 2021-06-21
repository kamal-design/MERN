import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import axios from "./axios";
import "./Chat.css";



function Chat({messages}) {

  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Arun",
      timestamp: new Date().toUTCString(),
      received: false,
    });
    setInput("");
  }


  //dropdown
  const options = [
    'Pin Chat',
    'Delete Chat',    
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="chat">
      
      <div className="chat__header">
          <Avatar />
          <div className="chat__headerInfo">
              <h3> Kamal Demo</h3>
              <p>Last seen at...</p> 
          </div>

          <div className="chat__headerRight">
            <IconButton> <SearchOutlined /> </IconButton>
            <IconButton aria-label="more" aria-controls="customized-menu" aria-haspopup="true" onClick={handleClick}> <MoreVert /> </IconButton>
              <Menu id="long-menu" anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                
              >
                {options.map((option) => (
                  <MenuItem key={option} selected={option === 'Pin Chat'} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>

          </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
            <p className={`chat__message ${message.received && "chat__reciever"}`}> 
              <span className="chat__name">{message.name} </span>          
              {message.message}
              <span className="chat_timestamp">{message.timestamp}</span>
            </p>
        ))}       
      </div>

      <div className="chat_footer">
          <IconButton><InsertEmoticon /> </IconButton>
          <IconButton> <AttachFile /> </IconButton>
          <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
            <button type="submit" onClick={sendMessage}>Send a message</button>
          </form>
          <IconButton><MicIcon /></IconButton>         
      </div>
    </div>
  )
}

export default Chat;
