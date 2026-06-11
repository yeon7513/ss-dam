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
    public List<Challenge> searchChallenges() {
        return sql.selectList("challenge.searchChallenges");
    }

    @Override
    public Challenge searchChallengeByCode(int code) {
        return sql.selectOne("challenge.searchChallengeByCode", code);
    }

    @Override
    public void registerChallenge(Challenge challenge) {
        sql.insert("challenge.registerChallenge", challenge);
    }

    @Override
    public void updateChallenge(Challenge challenge) {
        sql.update("challenge.updateChallenge", challenge);
    }

    @Override
    public void deleteChallenge(int code) {
        sql.update("challenge.deleteChallenge", code);
    }

    @Override
    public List<Challenge> searchPopularChallenges() {
        return sql.selectList("challenge.searchPopularChallenges");
    }

    @Override
    public Challenge searchLatestChallenge() {
        return sql.selectOne("challenge.searchLatestChallenge");
    }
}