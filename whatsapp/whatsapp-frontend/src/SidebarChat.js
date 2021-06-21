import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarChat.css";

function SidebarChat() {
  return (
    <div className="SidebarChat">
       <Avatar />
       <div className="sidebarChat__info">
         <h2> Kamal</h2>
         <p> This is the last message </p>
       </div>
    </div>
  )
}

export default SidebarChat
