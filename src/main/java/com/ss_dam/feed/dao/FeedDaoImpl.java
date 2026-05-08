package com.ss_dam.feed.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.feed.Feed;

@Repository
public class FeedDaoImpl implements FeedDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Feed> searchFeeds() {
    return sql.selectList("feed.searchFeeds");
  }

  @Override
  public Feed searchDetail(Long code) {
    return sql.selectOne("feed.searchDetail", code);
  }



}
