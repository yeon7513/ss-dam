package com.ss_dam.challenge.entry.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.challenge.entry.ChallengeEntry;

@Repository
public class ChallengeEntryDaoImpl implements ChallengeEntryDao {
	
	@Autowired
	SqlSession sql;
	
	@Override
	public List<ChallengeEntry> findAll(){
		return sql.selectList("chal_entry.findAll");
	}

}
