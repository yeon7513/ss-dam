package com.ss_dam.admin.log.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.admin.log.response.AdminActivity;

@Repository
public class AdminActivityLogDaoImpl implements AdminActivityLogDao {

    @Autowired
    private SqlSession sql;

    //관리자 회원 상세 - 회원 정지·해제 로그 전체 건수
    @Override
    public int countMemberLogs(Map<String, Object> params) {
        return sql.selectOne(
                "adminActivityLog.countMemberLogs", params);
    }

    //관리자 회원 상세 - 회원 정지·해제 로그 목록
    @Override
    public List<AdminActivity> loadMemberLogs(
            Map<String, Object> params) {

        return sql.selectList(
                "adminActivityLog.loadMemberLogs", params);
    }

}