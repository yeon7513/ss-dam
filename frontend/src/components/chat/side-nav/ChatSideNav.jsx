import React from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../../layout/default/sidebar/Sidebar.jsx";
import SearchBox from "../../common/search-box/SearchBox.jsx";
import ChatRoom from "./chat-room/ChatRoom.jsx";

import styles from "./ChatSideNav.module.scss";

/**
 * 채팅 사이드바 컴포넌트
 */
function ChatSideNav({ chatRooms, pager, activeRoomId, onClickChatRoom }) {
  return (
    <Sidebar isFixed={false} className={styles.sideNav}>
      {/* 상단 메뉴 링크 영역 */}
      <li className={styles.links}>
        {/* 로고 영역 */}
        <h1 className={styles.logoText}>
          <Link to="/" target="_blank">
            쓰담쓰담
          </Link>
        </h1>

        {/* 마이페이지 링크 영역 */}
        <Link to="/mypage" className={styles.mypageLink} target="_blank">
          마이페이지
        </Link>
      </li>

      {/* 검색 상자 영역 */}
      <li className={styles.search}>
        <SearchBox />
      </li>

      {/* 채팅방 목록 영역 */}
      <li className={styles.chatRooms}>
        <ChatRoom
          rooms={chatRooms}
          pager={pager}
          activeRoomId={activeRoomId}
          onClickChatRoom={onClickChatRoom}
        />
      </li>
    </Sidebar>
  );
}

export default ChatSideNav;
