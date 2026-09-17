package com.ss_dam.common.chat.model.request;

// 새로운 채팅방 생성 및 조회 시 사용할 DTO
// -> 있으면 조회 시 사용하고, 없으면 새로 만들어야하기 때문에..
public class ChatRoomRequest {
  private String roomId; // 채팅방 접근 아이디 (엔드포인트용)
  private String type; // 채팅방 타입 (거래글, 사용자간, 관리자 일방통행)
  private Long targetCode; // 거래글일 경우 해당 거래글의 PK
  private Long requesterCode; // 대화를 요청한 사용자 (송신자)
  private Long responderCode; // 대화를 요청받은 사용자 (수신자)


  // GETTER, SETTER
  public String getRoomId() {
    return roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Long getTargetCode() {
    return targetCode;
  }

  public void setTargetCode(Long targetCode) {
    this.targetCode = targetCode;
  }

  public Long getRequesterCode() {
    return requesterCode;
  }

  public void setRequesterCode(Long requesterCode) {
    this.requesterCode = requesterCode;
  }

  public Long getResponderCode() {
    return responderCode;
  }

  public void setResponderCode(Long responderCode) {
    this.responderCode = responderCode;
  }
}
