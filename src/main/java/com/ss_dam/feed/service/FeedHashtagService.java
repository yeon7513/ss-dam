package com.ss_dam.feed.service;

import java.util.List;
import com.ss_dam.feed.FeedHashtag;

public interface FeedHashtagService {

  List<FeedHashtag> searchHashtagByFeedCode(Long feedCode);

}
