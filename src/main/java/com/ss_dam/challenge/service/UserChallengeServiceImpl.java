package com.ss_dam.challenge.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.ChallengeInfo;
import com.ss_dam.challenge.dao.UserChallengeDao;
import com.ss_dam.feed.service.UserFeedService;
import com.ss_dam.point.service.UserPointService;

@Service
public class UserChallengeServiceImpl implements UserChallengeService {

	private final UserChallengeDao userChallengeDao;
	private final UserFeedService userFeedService;
	private final UserPointService userPointService;

	public UserChallengeServiceImpl(UserChallengeDao userChallengeDao, UserFeedService userFeedService,
			UserPointService userPointService) {
		this.userChallengeDao = userChallengeDao;
		this.userFeedService = userFeedService;
		this.userPointService = userPointService;
	}

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
		ChallengeInfo challengeInfo = userChallengeDao.searchChallengeInfoByCode(code, memCode);

		if (challengeInfo == null) {
			return null;
		}

		if (memCode != 0) {
			int proofCount = userFeedService.getProofCount(code, memCode);
			challengeInfo.setProofCount(proofCount);
		} else {
			challengeInfo.setProofCount(0);
		}

		return challengeInfo;
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

	@Transactional
	public void completeUserChallenge(int challengeCode, Long memCode) {

		// 테스트로 인해 하드코딩
		int rewardAmount = userChallengeDao.getChallengeRewardPoint(challengeCode);

		userPointService.rewardPoint(memCode, rewardAmount, "CHALLENGE_REWARD");
	}
}