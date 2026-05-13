package com.ss_dam.challenge.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.challenge.Challenge;

@Repository
public class ChallengeDaoImpl implements ChallengeDao {

	  @Autowired
	  SqlSession sql;
	
	@Override
	public List<Challenge> findAll() {
		return sql.selectList("challenge.findAll");
	}

}
