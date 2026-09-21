import React from 'react';
import Pagination from "../../../common/pagination/Pagination.jsx";
import ImageBox from "../../../common/image-box/ImageBox.jsx";

// 채팅방 목록
function ChatRoom({ room }) {

  console.log(room);

  const rooms = room?.content;
  const paginate = room?.pager;


  return (
    <div>
      <ul>
        {rooms?.map((room, idx) => (
          <li key={idx}>
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
      <Pagination pager={paginate} />
    </div>
  );
}

export default ChatRoom;
