package com.ss_dam.common.chat.service;

import com.ss_dam.common.chat.dao.ChatDao;
import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomCreate;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {

  @Autowired
  ChatDao chatDao;

  // 채팅방 불러오기 및 생성
  // 있으면? -> 채팅방 PK 반환 / 없으면? -> 생성 후 PK 반환
  @Override
  public Long loadOrCreateChatRoom(ChatRoomCreate chatRoomCreate) {

    // 채팅방 번호 찾기
    Long existingRoomCode = chatDao.findRoomCode(chatRoomCreate);

    // 존재하면 찾은 채팅방 번호를 반환
    if (existingRoomCode != null) {
      return existingRoomCode;
    }

    // 없으면 신규로 생성
    Long newRoomCode = chatDao.registerChatRoom(chatRoomCreate);

    return newRoomCode;
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
