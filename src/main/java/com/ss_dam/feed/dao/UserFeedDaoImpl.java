package com.ss_dam.feed.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.feed.model.core.FeedHashtag;
import com.ss_dam.feed.model.request.FeedCreate;
import com.ss_dam.feed.model.request.FeedUpdate;
import com.ss_dam.feed.model.response.FeedDetail;
import com.ss_dam.feed.model.response.FeedEditView;
import com.ss_dam.feed.model.response.UserFeedView;

@Repository
public class UserFeedDaoImpl implements UserFeedDao {
  
  private final SqlSession sql;
  
  public UserFeedDaoImpl(SqlSession sql) {
	  this.sql = sql;
  }

  @Override
  public List<UserFeedView> loadFeeds(Map<String, Object> params) {
    return sql.selectList("feedView.loadFeeds", params);
  }

  @Override
  public FeedDetail findFeedDetailByFeedCode(Map<String, Object> params) {
    return sql.selectOne("feedView.findFeedDetailByFeedCode", params);
  }

  // 이 부분 수정할 것. code를 꺼내오는 곳은 서비스로 이동..
  @Override
  public Long registerFeed(FeedCreate feedCreate) {
    sql.insert("feedCommand.registerFeed", feedCreate);
    return feedCreate.getCode();
  }

  @Override
  public void registerHashtags(List<FeedHashtag> feedHashtags) {
    sql.insert("feedCommand.registerHashtags", feedHashtags);
  }

  @Override
  public FeedEditView findFeedDetailForEdit(Map<String, Long> params) {
    return sql.selectOne("feedView.findFeedDetailForEdit", params);
  }

  @Override
  public void deleteHashtags(Long feedCode) {
    sql.delete("feedCommand.deleteHashtags", feedCode);
  }

  @Override
  public void updateFeed(FeedUpdate feedUpdate) {
    sql.update("feedCommand.updateFeed", feedUpdate);
  }

  @Override
  public void deleteFeed(Map<String, Object> params) {
    sql.update("feedCommand.deleteFeed", params);
  }

  @Override
  public float loadFeedsTotalCount(PageQuery pageQuery) {
    return sql.selectOne("feedView.loadFeedsTotalCount", pageQuery);
  }

  @Override
  public int countFeedsByChallenge(int chalCode, int memCode) {
	  Map<String, Object> params = new HashMap<>();
	  
	  params.put("chalCode", chalCode);
	  params.put("memCode", memCode);
	  
	return sql.selectOne("feedView.countFeedsByChallenge", params);
  }
}
