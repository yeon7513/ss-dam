package com.ss_dam.challenge.entry.dao;

import java.util.List;
import com.ss_dam.challenge.entry.ChallengeEntry;

public interface ChallengeEntryDao {
	
	List<ChallengeEntry> findAll();
}
