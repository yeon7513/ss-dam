package com.ss_dam.common.chat.service;

import com.ss_dam.common.chat.model.request.ChatRoomCreate;

public interface ChatService {
  Long loadOrCreateChatRoom(ChatRoomCreate chatRoomCreate);
}
