package com.ss_dam.admin.report.model.request;

// 사용자 신고 등록 요청
public class CreateReportRequest {

  // feed, market, comment, user
  private String targetType;

  // feed : 피드 번호
  // market : 상품 번호
  // comment : 댓글 번호
  // user : 신고 대상 회원 번호
  private Long targetCode;

  // 신고 사유 코드
  private String reasonType;

  // 신고 상세 내용
  private String content;

  public String getTargetType() {
    return targetType;
  }
 public void setTargetType(String targetType) {
        this.targetType = targetType;
    }

    public Long getTargetCode() {
        return targetCode;
    }

    public void setTargetCode(Long targetCode) {
        this.targetCode = targetCode;
    }

    public String getReasonType() {
        return reasonType;
    }

    public void setReasonType(String reasonType) {
        this.reasonType = reasonType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}