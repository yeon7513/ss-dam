package com.ss_dam.auth.member.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.login.model.response.MemberProfile;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.dao.MemberDao;
import com.ss_dam.auth.member.model.request.MemberUpdateRequest;
import com.ss_dam.common.image.service.ImageService;

@Service
public class MemberServiceImpl implements MemberService {

  private final MemberDao memberDao;
  private final ImageService imageService;

  public MemberServiceImpl (
    MemberDao memberDao,
    ImageService imageService
  ) {
    this.memberDao = memberDao;
    this.imageService = imageService;
  }
  
  @Override
  public MemberProfile searchProfileByMemberCode(Long code) {
    return memberDao.searchProfileByMemberCode(code);
  }

  @Override
  public Long registerMember(Member member) {

    Long newCode = memberDao.registerMember(member);

    if (member.getFile() != null && !member.getFile().isEmpty()) {
      // 프로필 사진 업로드
      imageService.uploadSingleImage(member.getFile(), "profile", newCode);
    }

    return newCode;
  }

  @Override
  public Member searchMemberByCode(Long code) {
    return memberDao.searchMemberByCode(code);
  }

  // [추가] 아이디 중복 확인 (중복 시 true, 사용 가능 시 false)
  @Override
  public boolean isIdDuplicated(String id) {
    return memberDao.countById(id) > 0;
  }

  // 회원 정보 수정
  @Override
  @Transactional
  public void updateMember(
      Long memberCode,
      MemberUpdateRequest request
  ) {
    // 존재 여부 확인 및 동시 수정 방지
    requireMemberForUpdate(memberCode);

    String phone = request.getPhone();
    String address = request.getAddress();
    String password = request.getPassword();

    if (phone == null || phone.isBlank()) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "전화번호를 입력해주세요."
      );
    }

    phone = phone.replace("-", "").trim();

    if (!phone.matches("^010\\d{8}$")) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "전화번호 형식이 올바르지 않습니다."
      );
    }

    if (address == null || address.isBlank()) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "주소를 입력해주세요."
      );
    }

    // 비밀번호는 입력한 경우에만 검증
    if (password != null && !password.isEmpty()) {
      if (!password.matches(
          "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])"
              + "[A-Za-z\\d@$!%*?&]{8,20}$"
      )) {
        throw new ResponseStatusException(
            HttpStatus.BAD_REQUEST,
            "비밀번호는 8~20자의 영문, 숫자, 특수문자(@$!%*?&)를 포함해야 합니다."
        );
      }
    }

    Member member = new Member();

    // 컨트롤러에서 전달받은 로그인 회원번호 사용
    member.setCode(memberCode);
    member.setPassword(password);
    member.setPhone(phone);
    member.setAddress(address.trim());

    memberDao.updateMember(member);

    // 새 프로필 사진을 선택한 경우에만 교체
    if (request.getFile() != null && !request.getFile().isEmpty()) {
      memberDao.deleteProfileImages(memberCode);

      imageService.uploadSingleImage(
          request.getFile(), "profile", memberCode
      );
    }
  }

  // 회원 탈퇴
  @Override
  @Transactional
  public void deleteMember(Long memberCode) {
    requireMemberForUpdate(memberCode);

    int result = memberDao.deleteMember(memberCode);

    if (result != 1) {
      throw new ResponseStatusException(
          HttpStatus.CONFLICT, "회원 탈퇴에 실패했습니다."
      );
    }

    memberDao.deleteProfileImages(memberCode);
  }

  // 수정·탈퇴 대상 확인
  private void requireMemberForUpdate(Long memberCode) {
    if (memberCode == null) {
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."
      );
    }

    Long code = memberDao.findMemberCodeForUpdate(memberCode);

    if (code == null) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND, "존재하지 않거나 탈퇴한 회원입니다."
      );
    }
  }


}
