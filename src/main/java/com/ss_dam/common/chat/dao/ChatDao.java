package com.ss_dam.common.chat.dao;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomCreate;
import com.ss_dam.common.chat.model.response.ChatMessageView;

public interface ChatDao {
  Long findRoomCode(ChatRoomCreate chatRoomCreate);

  Long registerChatRoom(ChatRoomCreate chatRoomCreate);

  Long registerChatMessage(ChatMessageCreate chatMessageCreate);

  ChatMessageView findChatMessageByCode(Long newMessageCode);
}
