package com.ss_dam.comment.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.comment.Comment;

@Repository
public class CommentDaoImpl implements CommentDao {

  @Autowired
  SqlSession sql;

  @Override
  public int countComment(Long feedCode) {
    return sql.selectOne("comment.countComment", feedCode);
  }

  @Override
  public List<Comment> searchCommentsByFeedCode(Long feedCode) {
    return sql.selectList("comment.searchCommentsByFeedCode", feedCode);
  }

}
