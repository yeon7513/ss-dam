package com.ss_dam.auth.find.service;

import com.ss_dam.auth.find.dao.FindMemberDao;
import com.ss_dam.auth.find.model.ChangePassword;
import com.ss_dam.auth.find.model.FindMember;
import com.ss_dam.auth.login.model.response.MemberProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FindMemberServiceImpl implements FindMemberService{

    private final FindMemberDao findMemberDao;

    public FindMemberServiceImpl(FindMemberDao findMemberDao) {
        this.findMemberDao = findMemberDao;
    }

    @Override
    public MemberProfile findMemberId(FindMember findMember) {
        return findMemberDao.findMemberId(findMember);
    }

    @Override
    public Long findMemberPw(FindMember findMember) {
        return findMemberDao.findMemberPw(findMember);
    }

    @Override
    public boolean changePw(ChangePassword changePassword) {
        int result = findMemberDao.changePassword(changePassword);
        if (result == 1)
            return true;
        return false;
    }
}
