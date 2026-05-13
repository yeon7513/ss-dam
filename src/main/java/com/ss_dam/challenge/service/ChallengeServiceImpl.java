package com.ss_dam.challenge.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.dao.ChallengeDao;

@Service
public class ChallengeServiceImpl implements ChallengeService {

	@Autowired
	ChallengeDao challengeDao;
	
	@Override
	public List<Challenge> findAll() {
	
		return challengeDao.findAll();
	}

}
