package com.ss_dam.common.chat.service;

import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatMessageView;

public interface ChatService {
  String loadOrCreateChatRoom(ChatRoomRequest chatRoomRequest);

  ChatMessageView registerChatMessage(ChatMessageCreate chatMessageCreate);
}
