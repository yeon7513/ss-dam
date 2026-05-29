package com.ss_dam.auth.member.dao;

import java.util.List;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.MemberProfile;

public interface MemberDao {

	List<MemberProfile> searchProfileByMemberCode(Long code);

	Long registerMember(Member member);

	Member searchMemberByCode(Long code);

}
