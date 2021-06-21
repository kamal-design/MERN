import React, {useState} from 'react';
import "./Sidebar.css";
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';



function Sidebar() {
  const [toggleState, setToggleState] = useState(1) ;

  const toggleTab = (index) => {
    setToggleState(index);
  }


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu8ndUheMPQDYJyvKdoxWRj7KcpbnkJwTGTS8RK8bw=s32-c-mo" />
        <div className="sidebar__headerRight">
            <IconButton> <DonutLargeIcon /> </IconButton>
            <IconButton> <ChatIcon /> </IconButton>
            <IconButton> <MoreVertIcon /> </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search" />
        </div>
      </div>

     
      <div className="tabssection">        
        <div className="user-tabs">
          <div className={toggleState === 1 ? "tabs active-tabs" : "tabs" } onClick={ () => toggleTab(1) }> Pinned Chats</div>
          <div className={toggleState === 2 ? "tabs active-tabs" : "tabs" } onClick={ () => toggleTab(2) }> DMs</div>
          <div className={toggleState === 3 ? "tabs active-tabs" : "tabs" } onClick={ () => toggleTab(3) }> GroupChats</div>
          <div className={toggleState === 4 ? "tabs active-tabs" : "tabs" } onClick={ () => toggleTab(4) }> Contacts</div>
        </div>

        <div className="content-tabs">
          <div className={toggleState === 1 ? "content active-content" : "content"}>
            <div className="sidebar__chats">
              <SidebarChat />
              <SidebarChat />
              <SidebarChat />
              <SidebarChat />            
            </div>
          </div>
          <div className={toggleState === 2 ? "content active-content" : "content"}>
              <h2> Tab two</h2>
          </div>
          <div className={toggleState === 3 ? "content active-content" : "content"}>
              <h2> Tab three</h2>
          </div>
          <div className={toggleState === 4 ? "content active-content" : "content"}>
              <h2> Tab four</h2>
          </div>
        </div>      
      </div>



      

    </div>
  )
}

export default Sidebar
