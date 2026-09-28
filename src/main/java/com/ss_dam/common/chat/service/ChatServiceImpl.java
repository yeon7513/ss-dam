package com.ss_dam.common.chat.service;

import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.common.chat.dao.ChatDao;
import com.ss_dam.common.chat.model.filter.ChatRoomSearchFilter;
import com.ss_dam.common.chat.model.request.ChatMessageCreate;
import com.ss_dam.common.chat.model.request.ChatRoomRequest;
import com.ss_dam.common.chat.model.response.ChatDetailView;
import com.ss_dam.common.chat.model.response.ChatMessageView;
import com.ss_dam.common.chat.model.response.ChatRoomInfo;
import com.ss_dam.common.chat.model.response.ChatRoomView;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.market.model.response.UserProductView;
import com.ss_dam.market.service.UserProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ChatServiceImpl implements ChatService {

  @Autowired
  MemberService memberService;

  @Autowired
  UserProductService userProductService;

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
  public ChatMessageView registerChatMessage(ChatMessageCreate chatMessageCreate, Long senderCode) {
    chatMessageCreate.setSenderCode(senderCode);

    Long roomCode = findRoomCodeByRoomId(chatMessageCreate.getRoomId());
    chatMessageCreate.setRoomCode(roomCode);

    chatDao.registerChatMessage(chatMessageCreate);

    Long newMessageCode = chatMessageCreate.getCode();

    if (newMessageCode == null) {
      return null;
    }

    return chatDao.findChatMessageByCode(newMessageCode);
  }

  // 과거 채팅 내역 조회
  @Override
  public ChatDetailView loadChatMessages(String roomId, Long memberCode) {
    Map<String, Object> params = new HashMap<>();
    params.put("roomId", roomId);
    params.put("memberCode", memberCode);

    return chatDao.loadChatMessages(params);
  }

  // 참여중인 채팅방 목록 조회
  @Override
  public PageResult<ChatRoomView> loadChatRoomsByMemberCode(Long memberCode,
      ChatRoomSearchFilter filter) {
    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("offset", filter.getOffset());
    params.put("perPage", filter.getPerPage());
    params.put("keyword", filter.getKeyword());

    List<ChatRoomView> chatRooms = chatDao.loadChatRoomsByMemberCode(params);
    float total = chatDao.loadChatRoomsTotalCount(filter);

    return PageResult.of(chatRooms, filter, total);
  }

  // 수신자 및 발신자 코드 추출하기!
  @Override
  public Long findReceiverCodeByRoomId(String roomId, Long senderCode) {
    Map<String, Object> params = new HashMap<>();
    params.put("roomId", roomId);
    params.put("senderCode", senderCode);

    return chatDao.findReceiverCodeByRoomId(params);
  }


  // ========= 헬퍼 메소드 =========
  // 새로 전송된 메시지를 전달하기 위해 roomCode가 필요함.
  // roomCode는 사용자들이 알지 못하는 개발용 PK이기 때문에
  // 내부적으로 불러와 사용한다.
  private Long findRoomCodeByRoomId(String roomId) {
    return chatDao.findRoomCodeByRoomId(roomId);
  }

  // 채팅방에 대한 상세 정보 불러오기 -> 안쓸것같기도한디..
  private ChatRoomInfo loadChatRoomInfo(Long MemberCode, String type, Long targetCode) {
    ChatRoomInfo info = new ChatRoomInfo();

    MemberProfile memberProfile = memberService.searchProfileByMemberCode(MemberCode);
    info.setOtherMemberProfile(memberProfile);

    if (type.equals("DEAL") && targetCode != null) {
      UserProductView product =
          userProductService.findProductDetailByProdCode(targetCode, MemberCode);
      info.setProductInfo(product);
    } else {
      info.setProductInfo(null);
    }

    return info;
  }

}
