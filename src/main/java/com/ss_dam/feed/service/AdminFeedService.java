package com.ss_dam.feed.service;

import java.util.List;

import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.feed.model.filter.AdminFeedSearchFilter;
import com.ss_dam.feed.model.response.AdminFeedLogView;
import com.ss_dam.feed.model.response.AdminFeedView;
import com.ss_dam.feed.model.response.AdminMemberFeedsView;

public interface AdminFeedService {
    
    // 관리자 회원 상세 - 작성 피드 탭
    AdminMemberFeedsView loadMemberFeeds(
            Long memberCode, PageQuery pageQuery);

	PageResult<AdminFeedView> loadFeeds(AdminFeedSearchFilter filter);

	AdminFeedView loadFeed(Long feedCode);

	void deleteFeed(Long feedCode, String reason, Long adminCode);

	void restoreFeed(Long feedCode, String reason, Long adminCode);

	List<AdminFeedLogView> loadFeedLogs(Long feedCode);
}