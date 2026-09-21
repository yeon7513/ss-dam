package com.ss_dam.common.chat.dao;

import com.ss_dam.common.chat.model.filter.ChatRoomSearchFilter;
import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatDetailView;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import com.ss_dam.common.chat.model.response.ChatRoomView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ChatDaoImpl implements ChatDao {

  @Autowired
  SqlSession sql;

  // roomId 찾기
  @Override
  public String findRoomId(ChatRoomRequest chatRoomRequest) {
    return sql.selectOne("chatView.findRoomId", chatRoomRequest);
  }

  @Override
  public Long findRoomCodeByRoomId(String roomId) {
    return sql.selectOne("chatView.findRoomCodeByRoomId", roomId);
  }

  // 기존 채팅방 상세 내역 조회
  @Override
  public ChatDetailView loadChatMessages(Map<String, Object> params) {
    return sql.selectOne("chatView.loadChatMessages", params);
  }

  @Override
  public List<ChatRoomView> loadChatRoomsByMemberCode(Map<String, Object> params) {
    return sql.selectList("chatView.loadChatRoomsByMemberCode", params);
  }

  @Override
  public float loadChatRoomsTotalCount(ChatRoomSearchFilter filter) {
    return sql.selectOne("chatView.loadChatRoomsTotalCount", filter);
  }

  // 신규 채팅방 저장
  @Override
  public void registerChatRoom(ChatRoomRequest chatRoomRequest) {
    sql.insert("chatCommand.registerChatRoom", chatRoomRequest);
  }

  // 신규 채팅 메시지 저장
  @Override
  public Long registerChatMessage(ChatMessageCreate chatMessageCreate) {
    return (long) sql.insert("chatCommand.registerChatMessage", chatMessageCreate);
  }

  // 기존 채팅 메시지 찾기
  @Override
  public ChatMessageView findChatMessageByCode(Long newMessageCode) {
    return sql.selectOne("chatView.findChatMessageByCode", newMessageCode);
  }
}
