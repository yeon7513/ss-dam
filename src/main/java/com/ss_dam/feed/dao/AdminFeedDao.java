package com.ss_dam.feed.dao;

import java.util.List;
import java.util.Map;

import com.ss_dam.feed.model.response.AdminMemberFeedsView;
import com.ss_dam.feed.model.response.UserFeedView;

public interface AdminFeedDao {

  // 회원 작성 피드 전체 통계
  AdminMemberFeedsView loadMemberFeedSummary(Map<String, Object> params);

  // 회원 작성 피드 페이지 목록
  List<UserFeedView> loadMemberFeeds(Map<String, Object> params);
}