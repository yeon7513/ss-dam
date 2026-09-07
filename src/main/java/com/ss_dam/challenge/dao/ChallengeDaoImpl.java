package com.ss_dam.challenge.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.ChallengeInfo;

@Repository
public class ChallengeDaoImpl implements ChallengeDao {

	@Autowired
	SqlSession sql;

	@Override
	public List<Challenge> searchChallenges(String progressStatus) {
		return sql.selectList("challenge.searchChallenges", progressStatus);
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

	@Override
	public ChallengeInfo searchChallengeInfoByCode(int code, int memCode) {
		Map<String, Object> params = new HashMap<>();
		params.put("code", code);
		params.put("memCode", memCode);
		
		return sql.selectOne("challenge.searchChallengeInfoByCode", params);
	}

	@Override
	public int joinChallenge(int code, int memCode) {
		Map<String, Object> params = new HashMap<>();
		params.put("code", code);
		params.put("memCode", memCode);
		
		return sql.insert("challenge.joinChallenge", params);
		
		
		
	}

	@Override
	public List<Map<String, Object>> searchTopRankings() {

		return sql.selectList("challenge.searchTopRankings");
	}
}