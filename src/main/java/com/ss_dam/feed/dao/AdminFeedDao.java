package com.ss_dam.feed.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.feed.model.filter.AdminFeedSearchFilter;
import com.ss_dam.feed.model.response.AdminFeedLogView;
import com.ss_dam.feed.model.response.AdminFeedView;
import com.ss_dam.feed.model.response.AdminMemberFeedsView;
import com.ss_dam.feed.model.response.UserFeedView;

public interface AdminFeedDao {

  // 회원 작성 피드 전체 통계
  AdminMemberFeedsView loadMemberFeedSummary(Map<String, Object> params);

  // 회원 작성 피드 페이지 목록
  List<UserFeedView> loadMemberFeeds(Map<String, Object> params);  

  int countFeeds(AdminFeedSearchFilter filter);

  int deleteFeed(Long feedCode);

  int restoreFeed(Long feedCode);

  List<AdminFeedLogView> loadFeedLogs(Long feedCode);  

  int insertActivityLog(Map<String, Object> params);

  AdminFeedView loadFeed(Long feedCode);

  List<AdminFeedView> loadFeeds(AdminFeedSearchFilter filter);
}