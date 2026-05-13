package com.ss_dam.challenge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.service.ChallengeService;


@RestController
@RequestMapping ("/challenge")
public class ChallengeController {

	@Autowired
    ChallengeService challengeService;
	
	@GetMapping
	public List<Challenge> getAllChallenges() {
		
	    return challengeService.findAll();
	}
}
