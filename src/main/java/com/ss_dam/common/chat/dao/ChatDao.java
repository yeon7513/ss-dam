package com.ss_dam.common.chat.dao;

import com.ss_dam.common.chat.model.filter.ChatRoomSearchFilter;
import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatDetailView;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import com.ss_dam.common.chat.model.response.ChatRoomView;

import java.util.List;
import java.util.Map;

public interface ChatDao {

  void registerChatRoom(ChatRoomRequest chatRoomRequest);

  void registerChatMessage(ChatMessageCreate chatMessageCreate);

  ChatMessageView findChatMessageByCode(Long newMessageCode);

  String findRoomId(ChatRoomRequest chatRoomRequest);

  Long findRoomCodeByRoomId(String roomId);

  ChatDetailView loadChatMessages(Map<String, Object> params);

  List<ChatRoomView> loadChatRoomsByMemberCode(Map<String, Object> params);

  float loadChatRoomsTotalCount(ChatRoomSearchFilter filter);

  Long findReceiverCodeByRoomId(Map<String, Object> params);
}
