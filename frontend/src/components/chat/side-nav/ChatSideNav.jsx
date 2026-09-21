import React from 'react';
import ChatRoom from "./chat-room/ChatRoom.jsx";
import SearchBox from "../../common/search-box/SearchBox.jsx";
import { Link } from "react-router-dom";
import styles from "./ChatSideNav.module.scss";
import Sidebar from "../../../layout/sidebar/Sidebar.jsx";

function ChatSideNav({ chatRooms }) {
  return (
    <Sidebar className={styles.sideNav} isFixed={false}>
      <li>
        <Link to="/" target="_blank">메인</Link>
        <Link to="/mypage" target="_blank">마이페이지</Link>
      </li>

      <li>
        <SearchBox />
      </li>

      <li>
        <ChatRoom room={chatRooms} />
      </li>
    </Sidebar>
  );
}

export default ChatSideNav;
