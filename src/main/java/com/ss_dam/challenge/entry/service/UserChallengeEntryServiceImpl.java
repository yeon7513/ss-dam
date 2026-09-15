package com.ss_dam.challenge.entry.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.challenge.entry.ChallengeEntry;
import com.ss_dam.challenge.entry.dao.UserChallengeEntryDao;


@Service
public class UserChallengeEntryServiceImpl implements UserChallengeEntryService {	
	@Autowired
	UserChallengeEntryDao challengeEntryDao;
	
	@Override
	public List<ChallengeEntry> findAll(){
		return challengeEntryDao.findAll();
		
	}

}
