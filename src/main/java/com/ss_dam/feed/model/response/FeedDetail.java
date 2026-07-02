package com.ss_dam.feed.model.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ss_dam.comment.model.response.UserCommentView;

import java.util.List;

// 상세 정보 조회용 DTO
// 피드 목록 조회용 DTO 상속
// -> 상세 조회 시 필요한 내용만 DTO로 만듦.


// UserFeedView에서만 사용하는 (상세 정보 조회 시에는 필요하지 않은)
// thumbnail 필드가 같이 상속되어 결과 JSON에 찌꺼기같이 남아 있음.
// -> @JsonIgnoreProperties 어노테이션을 사용함.
// @JsonIgnoreProperties
// 클래스 수준에서 사용되며, 무시할 속성이나 속성 목록을 표시하는 데 사용
@JsonIgnoreProperties({"thumbnail"})
public class FeedDetail extends UserFeedView {
  // 상세 내용 & 등록된 이미지 리스트
  private String content;
  private List<String> imagePaths;

  // 댓글 리스트
  private List<UserCommentView> comments;

  // GETTER, SETTER
  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public List<String> getImagePaths() {
    return imagePaths;
  }

  public void setImagePaths(List<String> imagePaths) {
    this.imagePaths = imagePaths;
  }

  public List<UserCommentView> getComments() {
    return comments;
  }

  public void setComments(List<UserCommentView> comments) {
    this.comments = comments;
  }
}
