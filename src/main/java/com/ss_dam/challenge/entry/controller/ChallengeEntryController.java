package com.ss_dam.challenge.entry.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.challenge.entry.ChallengeEntry;
import com.ss_dam.challenge.entry.service.ChallengeEntryService;
import com.ss_dam.common.ApiResponse;

@RestController
@RequestMapping ("/chal_entry")
public class ChallengeEntryController {

	@Autowired
	ChallengeEntryService challengeEntryService;
	
	@GetMapping
	public ResponseEntity<ApiResponse<List<ChallengeEntry>>> getAllEntries() {
		
		List<ChallengeEntry> entries = challengeEntryService.findAll(); 
	    
	    return ResponseEntity.ok(ApiResponse.success("챌린지 참여 목록 조회 성공", entries));
	}
}