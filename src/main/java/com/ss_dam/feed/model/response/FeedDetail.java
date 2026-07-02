package com.ss_dam.feed.model.response;

import com.ss_dam.comment.model.response.UserCommentView;

import java.util.List;

// 상세 정보 조회용 DTO
public class FeedDetail {
  // 피드 조회용 DTO
  private UserFeedView userFeedView;

  // 상세 내용 & 등록된 이미지 리스트
  private String content;
  private List<String> imagePaths;

  // 댓글 리스트
  private List<UserCommentView> comments;

  // GETTER, SETTER
  public UserFeedView getUserFeedView() {
    return userFeedView;
  }

  public void setUserFeedView(UserFeedView userFeedView) {
    this.userFeedView = userFeedView;
  }

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
