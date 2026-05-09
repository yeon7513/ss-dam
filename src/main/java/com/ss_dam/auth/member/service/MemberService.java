package com.ss_dam.auth.member.service;

import java.util.List;
import com.ss_dam.auth.member.MemberProfile;

public interface MemberService {

  List<MemberProfile> searchProfileByMemberCode(Long code);

}
