package com.ss_dam.challenge.entry.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.challenge.entry.ChallengeEntry;
import com.ss_dam.challenge.entry.service.ChallengeEntryService;

@RestController
@RequestMapping ("/chal_entry")
public class ChallengeEntryController {

	@Autowired
	ChallengeEntryService challengeEntryService;
	
	@GetMapping
	public List<ChallengeEntry> getAllEntries() {
	    
	    return challengeEntryService.findAll();
	}
}