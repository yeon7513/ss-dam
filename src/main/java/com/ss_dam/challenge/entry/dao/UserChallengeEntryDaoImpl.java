package com.ss_dam.challenge.entry.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.challenge.entry.ChallengeEntry;

@Repository
public class UserChallengeEntryDaoImpl implements UserChallengeEntryDao {
	
	private final SqlSession sql;

	public UserChallengeEntryDaoImpl (SqlSession sql) {
		this.sql = sql;
	}
	
	@Override
	public List<ChallengeEntry> findAll(){
		return sql.selectList("chal_entry.findAll");
	}

}
