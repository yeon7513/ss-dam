package com.ss_dam.challenge.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.Challenge;

@Repository
public class ChallengeDaoImpl implements ChallengeDao {

    @Autowired
    SqlSession sql;

    @Override
    public List<Challenge> findAll() {
        return sql.selectList("challenge.findAll");
    }

    @Override
    public Challenge findByCode(int code) {
        return sql.selectOne("challenge.findByCode", code);
    }

    @Override
    public void add(Challenge item) {
        sql.insert("challenge.add", item);
    }

    @Override
    public void update(Challenge item) {
        sql.update("challenge.update", item);
    }

    @Override
    public void delete(int code) {
        sql.delete("challenge.delete", code);
    }
}