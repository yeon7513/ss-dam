package com.ss_dam.challenge.service;

import com.ss_dam.challenge.model.response.AdminMemberProofsView;
import com.ss_dam.common.pager.PageQuery;

public interface AdminChallengeService {
    
    // 회원 인증글 통계와 페이지 목록
    AdminMemberProofsView loadMemberProofs(
            Long memberCode, PageQuery pageQuery);
}