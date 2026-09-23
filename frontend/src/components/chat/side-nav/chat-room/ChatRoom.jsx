import React from 'react';
import Pagination from "../../../common/pagination/Pagination.jsx";
import ImageBox from "../../../common/image-box/ImageBox.jsx";
import styles from "./ChatRoom.module.scss";
import cn from "classnames";

// 채팅방 목록
function ChatRoom({ rooms, pager, activeRoomId, onClickChatRoom }) {


  return (
    <div>
      <ul>
        {rooms?.map((room, idx) => (
          <li
            key={idx}
            className={cn(styles.roomItem, activeRoomId === room.roomId ? styles.active : "")}
            onClick={() => onClickChatRoom(room.roomId)}
          >
            <div>
              <span>{room.info.type}</span>
              <div>
                <ImageBox src={room.info.otherMemberProfile.profileImage} />
                {room.info.otherMemberProfile.id}
              </div>
            </div>
            <div>{room.lastMessage}</div>
            <div>{room.lastMessageTime}</div>
            <div>{room.unreadCount}</div>
          </li>
        ))}
      </ul>
      <Pagination pager={pager} />
    </div>
  );
}

export default ChatRoom;
