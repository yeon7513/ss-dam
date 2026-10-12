package com.ss_dam.point.service;

import com.ss_dam.point.dao.UserPointDao;
import org.springframework.stereotype.Service;

@Service
public class UserPointServiceImpl implements UserPointService {

	private final UserPointDao pointDao;

    public UserPointServiceImpl(UserPointDao pointDao) {
        this.pointDao = pointDao;
    }

	//보유하고 있는 포인트 조회
    @Override
	public int getPointBalance(Long code) {
		return pointDao.getPointBalance(code);
	}

}
