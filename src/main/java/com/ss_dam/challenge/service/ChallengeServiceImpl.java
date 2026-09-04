package com.ss_dam.challenge.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.ChallengeInfo;
import com.ss_dam.challenge.dao.ChallengeDao;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    @Autowired
    ChallengeDao challengeDao;

    @Override
    public List<Challenge> searchChallenges(String progressStatus) {
        return challengeDao.searchChallenges(progressStatus);
    }

    @Override
    public Challenge searchChallengeByCode(int code) {
        return challengeDao.searchChallengeByCode(code);
    }

    @Override
    public void registerChallenge(Challenge challenge) {
        challengeDao.registerChallenge(challenge);
    }

    @Override
    public void updateChallenge(Challenge challenge) {
        challengeDao.updateChallenge(challenge);
    }

    @Override
    public void deleteChallenge(int code) {
        challengeDao.deleteChallenge(code);
    }

    @Override
    public List<Challenge> searchPopularChallenges() {
        return challengeDao.searchPopularChallenges();
    }

    @Override
    public Challenge searchLatestChallenge() {
        return challengeDao.searchLatestChallenge();
    }

	@Override
	public ChallengeInfo searchChallengeInfoByCode(int code, int memCode) {		
		return challengeDao.searchChallengeInfoByCode(code, memCode);
	}

	@Override
	public boolean joinChallenge(int code, int memCode) {
		int rows = challengeDao.joinChallenge(code, memCode);
		return rows > 0;
		
	}

	@Override
	public List<Map<String, Object>> searchTopRankings() {
		return challengeDao.searchTopRankings();
	}
}