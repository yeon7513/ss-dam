package com.ss_dam.common.chat.dao;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChatDaoImpl implements ChatDao {

  @Autowired
  SqlSession sql;

  // roomId 찾기
  @Override
  public String findRoomId(ChatRoomRequest chatRoomRequest) {
    return sql.selectOne("chat.findRoomId", chatRoomRequest);
  }

  // 신규 채팅방 저장
  @Override
  public void registerChatRoom(ChatRoomRequest chatRoomRequest) {
    sql.insert("chat.registerChatRoom", chatRoomRequest);
  }

  // 신규 채팅 메시지 저장
  @Override
  public Long registerChatMessage(ChatMessageCreate chatMessageCreate) {
    return sql.insert("chat.registerChatMessage", chatMessageCreate);
  }

  // 기존 채팅 메시지 찾기
  @Override
  public ChatMessageView findChatMessageByCode(Long newMessageCode) {
    return sql.selectOne("chat.findChatMessageByCode", newMessageCode);
  }
}
