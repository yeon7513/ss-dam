package com.ss_dam.feed.dao;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.feed.model.response.UserFeedView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserFeedDaoImpl implements UserFeedDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<UserFeedView> searchFeeds(Pager pager) {
    return sql.selectList("userFeedView.searchFeeds", pager);
  }
}
