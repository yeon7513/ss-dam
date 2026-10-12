package com.ss_dam.point.service;

import com.ss_dam.point.dao.UserPointDao;
import org.springframework.stereotype.Service;

@Service
public class UserPointServiceImpl implements UserPointService {

	private final UserPointDao pointDao;

    public UserPointServiceImpl(UserPointDao pointDao) {
        this.pointDao = pointDao;
    }

    @Override
	public int getPointBalance(Long code) {
		return pointDao.getPointBalance(code);
	}

}
