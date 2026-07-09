package com.ss_dam.feed.dao;

import com.ss_dam.feed.model.core.FeedHashtag;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.UserFeedView;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserFeedDaoImpl implements UserFeedDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<UserFeedView> loadFeeds(Map<String, Object> params) {
    return sql.selectList("userFeedView.loadFeeds", params);
  }

  @Override
  public FeedDetail findFeedDetailByFeedCode(Map<String, Object> params) {
    return sql.selectOne("userFeedView.findFeedDetailByFeedCode", params);
  }

  @Override
  public Long registerFeed(FeedCreate feedCreate) {
    sql.insert("feedCommand.registerFeed", feedCreate);
    return feedCreate.getCode();
  }

  @Override
  public void registerHashtags(List<FeedHashtag> feedHashtags) {
    sql.insert("feedCommand.registerHashtags", feedHashtags);
  }
}
