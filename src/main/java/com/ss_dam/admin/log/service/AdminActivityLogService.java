package com.ss_dam.admin.log.service;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;

public interface AdminActivityLogService {
    
    // 회원 정지·해제 로그 조회
    PageResult<AdminActivity> loadMemberLogs(
            Long memberCode, PageQuery pageQuery);
}