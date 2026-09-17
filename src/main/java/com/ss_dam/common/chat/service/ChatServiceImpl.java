package com.ss_dam.common.chat.service;

import com.ss_dam.common.chat.dao.ChatDao;
import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ChatServiceImpl implements ChatService {

  @Autowired
  ChatDao chatDao;

  // 채팅방 불러오기 및 생성
  // 있으면? -> 채팅방 PK 반환 / 없으면? -> 생성 후 roomId(UUID) 반환
  @Transactional // 생성 작업이 포함되어있기 때문에 안전 장치로 사용!
  @Override
  public String loadOrCreateChatRoom(ChatRoomRequest chatRoomRequest) {

    // 채팅방 번호 찾기
    String existingRoomId = chatDao.findRoomId(chatRoomRequest);

    // 존재하면 찾은 채팅방 아이디를 반환
    if (existingRoomId != null) {
      return existingRoomId;
    }

    // 없으면 신규로 생성
    String newRoomId = UUID.randomUUID().toString();
    chatRoomRequest.setRoomId(newRoomId);
    chatDao.registerChatRoom(chatRoomRequest);

    return newRoomId;
  }


  // 전송된 메시지와 정보를 DB에 저장
  @Override
  public ChatMessageView registerChatMessage(ChatMessageCreate chatMessageCreate) {
    Long newMessageCode = chatDao.registerChatMessage(chatMessageCreate);

    if (newMessageCode == null) {
      return null;
    }

    return chatDao.findChatMessageByCode(newMessageCode);
  }
}
