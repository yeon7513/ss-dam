package com.ss_dam.common.chat.dao;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatMessageView;

public interface ChatDao {

  void registerChatRoom(ChatRoomRequest chatRoomRequest);

  Long registerChatMessage(ChatMessageCreate chatMessageCreate);

  ChatMessageView findChatMessageByCode(Long newMessageCode);

  String findRoomId(ChatRoomRequest chatRoomRequest);
}
