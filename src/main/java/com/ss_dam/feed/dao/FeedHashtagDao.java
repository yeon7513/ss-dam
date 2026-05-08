package com.ss_dam.feed.dao;

import java.util.List;
import com.ss_dam.feed.FeedHashtag;

public interface FeedHashtagDao {

  List<FeedHashtag> seacrchHashtagByFeedCode(Long feedCode);

}
