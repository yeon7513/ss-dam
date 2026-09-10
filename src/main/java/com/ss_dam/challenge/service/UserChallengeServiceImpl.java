package com.ss_dam.challenge.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.ChallengeInfo;
import com.ss_dam.challenge.dao.UserChallengeDao;

@Service
public class UserChallengeServiceImpl implements UserChallengeService {

    @Autowired
    UserChallengeDao userChallengeDao;

    @Override
    public List<Challenge> searchChallenges(String progressStatus) {
        return userChallengeDao.searchChallenges(progressStatus);
    }

    @Override
    public Challenge searchChallengeByCode(int code) {
        return userChallengeDao.searchChallengeByCode(code);
    }

    @Override
    public void registerChallenge(Challenge challenge) {
        userChallengeDao.registerChallenge(challenge);
    }

    @Override
    public void updateChallenge(Challenge challenge) {
        userChallengeDao.updateChallenge(challenge);
    }

    @Override
    public void deleteChallenge(int code) {
        userChallengeDao.deleteChallenge(code);
    }

    @Override
    public List<Challenge> searchPopularChallenges() {
        return userChallengeDao.searchPopularChallenges();
    }

    @Override
    public Challenge searchLatestChallenge() {
        return userChallengeDao.searchLatestChallenge();
    }

	@Override
	public ChallengeInfo searchChallengeInfoByCode(int code, int memCode) {		
		return userChallengeDao.searchChallengeInfoByCode(code, memCode);
	}

	@Override
	public boolean joinChallenge(int code, int memCode) {
		int rows = userChallengeDao.joinChallenge(code, memCode);
		return rows > 0;
		
	}

	@Override
	public List<Map<String, Object>> searchTopRankings() {
		return userChallengeDao.searchTopRankings();
	}
}