package com.ss_dam.comment.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.response.UserCommentView;

@Repository
public class UserCommentDaoImpl implements UserCommentDao {

  @Autowired
  SqlSession sql;

  //피드별 댓글 조회
  @Override
  public List<UserCommentView> findCommentsByFeedCode(Map<String, Object> params) {
    return sql.selectList("userCommentView.findCommentsByFeedCode", params);
  }

  //댓글 등록 (임시)
  @Override
  public int registerComment(CommentCreate comment){
    return sql.insert("commentCommand.registerComment", comment);
  }

  //댓글 수정
  @Override
  public int updateComment(
      Map<String, Object> params) {

    return sql.update(
        "commentCommand.updateComment",
        params
    );
  }

  //댓글 삭제
  @Override
  public int deleteComment(Map<String, Object> params) {
    
    return sql.update("commentCommand.deleteComment",
    params); 
  }
}