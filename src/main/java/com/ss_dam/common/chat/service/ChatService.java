package com.ss_dam.common.chat.service;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomCreate;
import com.ss_dam.common.chat.model.response.ChatMessageView;

public interface ChatService {
  Long loadOrCreateChatRoom(ChatRoomCreate chatRoomCreate);

  ChatMessageView registerChatMessage(ChatMessageCreate chatMessageCreate);
}
