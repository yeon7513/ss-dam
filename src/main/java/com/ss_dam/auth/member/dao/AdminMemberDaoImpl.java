package com.ss_dam.auth.member.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.auth.member.model.response.AdminMemberDetailView;
import com.ss_dam.auth.member.model.response.AdminMemberView;

@Repository 
public class AdminMemberDaoImpl implements AdminMemberDao {

  
    @Autowired
    private SqlSession sql;

    // 검색 조건에 해당하는 전체 회원 수
    @Override
    public int countMembers(Map<String, Object> params) {
        return sql.selectOne("adminMember.countMembers", params);
    }

    // 관리자 회원 목록 조회
    @Override
    public List<AdminMemberView> loadMembers(
            Map<String, Object> params) {

        return sql.selectList("adminMember.loadMembers", params);
    }

    // 관리자 회원 상세 조회 — 기본 정보 및 프로필 사진
    @Override
    public AdminMemberDetailView loadMember(Long memberCode) {

        return sql.selectOne(
                "adminMember.loadMember",
                memberCode);
    }
}
