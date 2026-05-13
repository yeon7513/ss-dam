package com.ss_dam.challenge.entry.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.challenge.entry.ChallengeEntry;
import com.ss_dam.challenge.entry.dao.ChallengeEntryDao;


@Service
public class ChallengeEntryServiceImpl implements ChallengeEntryService {	
	@Autowired
	ChallengeEntryDao challengeEntryDao;
	
	@Override
	public List<ChallengeEntry> findAll(){
		return challengeEntryDao.findAll();
		
	}

}
