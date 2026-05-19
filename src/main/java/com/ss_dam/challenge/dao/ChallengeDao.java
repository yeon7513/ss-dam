package com.ss_dam.challenge.dao;

import java.util.List;

import com.ss_dam.challenge.Challenge;

public interface ChallengeDao {

    // 전체 조회
    List<Challenge> findAll();

    // 상세 조회
    Challenge findByCode(int code);

    // 등록
    void add(Challenge item);

    // 수정
    void update(Challenge item);

    // 삭제
    void delete(int code);
}