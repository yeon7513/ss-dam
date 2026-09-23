package com.ss_dam.common.chat.service;

import com.ss_dam.common.chat.model.filter.ChatRoomSearchFilter;
import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatDetailView;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import com.ss_dam.common.chat.model.response.ChatRoomView;
import com.ss_dam.common.pager.PageResult;

public interface ChatService {
  String loadOrCreateChatRoom(ChatRoomRequest chatRoomRequest);

  ChatMessageView registerChatMessage(ChatMessageCreate chatMessageCreate, Long senderCode);

  ChatDetailView loadChatMessages(String roomId, Long memberCode);

  PageResult<ChatRoomView> loadChatRoomsByMemberCode(Long memberCode, ChatRoomSearchFilter filter);

  Long findReceiverCodeByRoomId(String roomId, Long senderCode);
}
