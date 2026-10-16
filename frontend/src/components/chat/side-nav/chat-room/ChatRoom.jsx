import React from "react";
import cn from "classnames";

import ImageBox from "../../../common/image-box/ImageBox.jsx";
import Pagination from "../../../common/pagination/Pagination.jsx";

import styles from "./ChatRoom.module.scss";

/**
 * 채팅방 목록 컴포넌트
 */
function ChatRoom({ rooms, pager, activeRoomId, onClickChatRoom }) {
  return (
    <div>
      {/* 채팅방 목록 영역 */}
      <ul className={styles.roomList}>
        {rooms?.map((room, idx) => (
          /* 개별 채팅방 항목 영역 */
          <li
            key={idx}
            className={cn(
              styles.roomItem,
              activeRoomId === room.roomId ? styles.active : "",
            )}
            onClick={() => onClickChatRoom(room.roomId)}
          >
            {/* 채팅방 컨테이너 영역 */}
            <div className={styles.chatRoomContainer}>
              {/* 상단 정보 영역 */}
              <div className={styles.topBox}>
                {/* 프로필 영역 */}
                <div className={styles.profileBox}>
                  <ImageBox src={room.info.otherMemberProfile.profileImage} />
                </div>

                {/* 사용자 정보 영역 */}
                <div className={styles.infoBox}>
                  {/* 사용자 명칭 영역 */}
                  <div className={styles.userBox}>
                    {/* 사용자 유형 태그 영역 */}
                    <div className={styles.userTpye}>
                      <span className={styles.userTpye}>{room.info.type}</span>
                    </div>
                    <span>{room.info.otherMemberProfile.id}</span>
                  </div>

                  {/* 작성 시각 영역 */}
                  <div className={styles.timeBox}>{room.lastMessageTime}</div>
                </div>
              </div>

              {/* 하단 내용 영역 */}
              <div className={styles.bottomBox}>
                {/* 최근 메시지 내용 영역 */}
                <div className={styles.messageBox}>
                  {room.lastMessage ? room.lastMessage : "대화를 시작해 보세요."}
                </div>

                {/* 미읽음 알림 배지 영역 */}
                <div className={styles.countBadge}>
                  {/* 미읽음 수량 텍스트 영역 */}
                  <div className={styles.unreadBox}>{room.unreadCount}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 영역 */}
      <Pagination pager={pager} />
    </div>
  );
}

export default ChatRoom;
