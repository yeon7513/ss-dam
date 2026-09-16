package com.ss_dam.common.chat.dao;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomCreate;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChatDaoImpl implements ChatDao {

  @Autowired
  SqlSession sql;

  @Override
  public Long findRoomCode(ChatRoomCreate chatRoomCreate) {
    return sql.selectOne("chat.findRoomCode", chatRoomCreate);
  }

  @Override
  public Long registerChatRoom(ChatRoomCreate chatRoomCreate) {
    return (long) sql.insert("chat.registerChatRoom", chatRoomCreate);
  }

  @Override
  public Long registerChatMessage(ChatMessageCreate chatMessageCreate) {
    return 0L;
  }

  @Override
  public ChatMessageView findChatMessageByCode(Long newMessageCode) {
    return null;
  }

}
