package com.ss_dam.comment.service;

import com.ss_dam.comment.Comment;
import com.ss_dam.comment.dao.UserCommentDao;
import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.response.UserCommentView;
import com.ss_dam.common.pager.Pager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserCommentServiceImpl implements UserCommentService {

  @Autowired
  UserCommentDao userCommentDao;

  // 피드에서 호출하는 댓글리스트
  @Override
  public List<UserCommentView> findCommentsByFeedCode(Long feedCode, Pager pager, Long memberCode) {

    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("feedCode", feedCode);
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return userCommentDao.findCommentsByFeedCode(params);
  }

  //댓글 등록
  @Override
  public CommentCreate registerComment(Comment comment) {
    if (comment == null){
      throw new IllegalArgumentException("댓글 정보가 필요합니다");
    }
    if (comment.getFeedCode() == null) {
      throw new IllegalArgumentException("피드 번호가 필요합니다.");
    }

    if (comment.getMemCode() == null) {
      throw new IllegalArgumentException("회원 번호가 필요합니다.");
    }

    // 별도의 예외 처리기 추가 예정
    // 잘못된 요청이므로 원래는 400 Bad Request가 적절. 추후 @RestControllerAdvice를 추가
    if (comment.getContent() == null || comment.getContent().isBlank()) {
      throw new IllegalArgumentException("댓글 내용을 입력해주세요.");
    }


    //서버에서 관리할 값 설정
    comment.setContent(comment.getContent().trim());
    comment.setStatus("active");
    comment.setDeleteYn(false);

    int insertedRows = userCommentDao.registerComment(comment);

    if (insertedRows != 1) {
      throw new IllegalStateException("댓글 등록에 실패했습니다.");
    }

    // Controller가 CommentCreate를 반환하도록 되어 있으므로 응답 DTO 생성
    CommentCreate createdComment = new CommentCreate();
    createdComment.setFeedCode(comment.getFeedCode());
    createdComment.setContent(comment.getContent());

    return createdComment;
  }

}

