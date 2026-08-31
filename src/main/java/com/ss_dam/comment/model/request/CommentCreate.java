package com.ss_dam.comment.model.request;

// 댓글 등록용 DTO
// 작성자 같은 경우는 세션에서 꺼내오기 때문에 x
// 서비스에서 조립해 DAO로 넘겨줌
public class CommentCreate {
  private Long feedCode; // 피드 고유 번호
  private String content;
  private Long memCode;
  private Long code; // 이후 수정,삭제에 필요

   // 댓글 내용

  // GETTER, SETTER
  public Long getFeedCode() {
    return feedCode;
  }

  public void setFeedCode(Long feedCode) {
    this.feedCode = feedCode;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

    public Long getMemCode() {
    return memCode;
  }

  public void setMemCode(Long memCode) {
    this.memCode = memCode;
  }

  public Long getCode(){
    return code;
  }

  public void setCode(Long code){
    this.code = code;
  }
}
