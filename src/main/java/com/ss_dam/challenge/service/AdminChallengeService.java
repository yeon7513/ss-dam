package com.ss_dam.challenge.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ss_dam.challenge.model.request.AdminChallengeSearch;
import com.ss_dam.challenge.model.request.AdminChallengeWriteRequest;
import com.ss_dam.challenge.model.response.AdminChallengeListView;
import com.ss_dam.common.pager.PageResult;

public interface AdminChallengeService {

	// 챌린지 목록 조회 
	PageResult<AdminChallengeListView> loadChallenges(AdminChallengeSearch search);

	// 챌린지 등록
	Long registerChallenge(AdminChallengeWriteRequest request, List<MultipartFile> files, Long adminCode, String adminId);
	
	// 챌린지 수정
	void updateChallenge(Long code, AdminChallengeWriteRequest request,  List<MultipartFile> files, boolean replaceImages, Long adminCode, String adminId);

	// 챌린지 논리 삭제
	void deleteChallenge(Long code, Long adminCode, String adminId);

	// 챌린지 조기 완료
	void endChallenge(Long code, Long adminCode, String adminId);    

	// 삭제된 챌린지 복구
	void restoreChallenge(Long code, String reason, Long adminCode, String adminId);

}