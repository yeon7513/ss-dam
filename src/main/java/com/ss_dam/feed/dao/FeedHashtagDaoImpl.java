package com.ss_dam.feed.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.feed.FeedHashtag;

@Repository
public class FeedHashtagDaoImpl implements FeedHashtagDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<FeedHashtag> seacrchHashtagByFeedCode(Long feedCode) {
    return sql.selectList("feedHashtag.seacrchHashtagByFeedCode", feedCode);
  }

}
