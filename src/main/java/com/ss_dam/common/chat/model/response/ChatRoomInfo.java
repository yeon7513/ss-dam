package com.ss_dam.common.chat.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.market.model.response.UserProductView;

public class ChatRoomInfo {
  // 채팅방 타입 (거래/1:1/관리자)
  private String type;

  // 상대방 프로필 정보
  private MemberProfile otherMemberProfile;

  // 거래글일 경우 요약 정보 (type == DEAL일 때만 사용)
  @JsonInclude(JsonInclude.Include.NON_NULL)
  private UserProductView productInfo;


  // GETTER, SETTER
  public MemberProfile getOtherMemberProfile() {
    return otherMemberProfile;
  }

  public void setOtherMemberProfile(MemberProfile otherMemberProfile) {
    this.otherMemberProfile = otherMemberProfile;
  }

  public UserProductView getProductInfo() {
    return productInfo;
  }

  public void setProductInfo(UserProductView productInfo) {
    this.productInfo = productInfo;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }
}
