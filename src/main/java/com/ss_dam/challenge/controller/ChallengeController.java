package com.ss_dam.challenge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ss_dam.challenge.Challenge;
import com.ss_dam.challenge.service.ChallengeService;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    @Autowired
    ChallengeService challengeService;

    // 전체 챌린지 조회
    @GetMapping
    public List<Challenge> searchChallenges() {
        return challengeService.searchChallenges();
    }

    // 챌린지 상세 조회
    @GetMapping("/{code}")
    public Challenge searchChallengeByCode(@PathVariable int code) {
        return challengeService.searchChallengeByCode(code);
    }

    // 챌린지 등록
    @PostMapping
    public void registerChallenge(@RequestBody Challenge challenge) {
        challengeService.registerChallenge(challenge);
    }

    // 챌린지 수정
    @PutMapping("/{code}")
    public void updateChallenge(@PathVariable int code,
                                @RequestBody Challenge challenge) {

        challenge.setCode(code);

        challengeService.updateChallenge(challenge);
    }

    // 챌린지 삭제
    @DeleteMapping("/{code}")
    public void deleteChallenge(@PathVariable int code) {
        challengeService.deleteChallenge(code);
    }
}


