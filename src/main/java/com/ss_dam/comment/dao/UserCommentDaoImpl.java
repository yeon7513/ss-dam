package com.ss_dam.comment.dao;

import com.ss_dam.comment.Comment;
import com.ss_dam.comment.model.response.UserCommentView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserCommentDaoImpl implements UserCommentDao {

  @Autowired
  SqlSession sql;

  //피드별 댓글 조회
  @Override
  public List<UserCommentView> findCommentsByFeedCode(Map<String, Object> params) {
    return sql.selectList("userCommentView.findCommentsByFeedCode", params);
  }

  //댓글 등록
  @Override
  public int registerComment(Comment comment){
    return sql.insert("commentCommand.registerComment", comment);
  }
}
