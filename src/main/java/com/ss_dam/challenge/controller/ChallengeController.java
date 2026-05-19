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

<<<<<<< Updated upstream
    // 전체 조회
    @GetMapping
    public List<Challenge> getAllChallenges() {
        return challengeService.findAll();
    }
=======
<<<<<<< Updated upstream
  // 전체 조회
  @GetMapping
  public List<Challenge> getAllChallenges() {
    return challengeService.findAll();
  }
>>>>>>> Stashed changes

    // 상세 조회
    @GetMapping("/{code}")
    public Challenge getChallenge(@PathVariable int code) {
        return challengeService.findByCode(code);
    }

    // 등록
    @PostMapping
    public void add(@RequestBody Challenge item) {
        challengeService.add(item);
    }

    // 수정
    @PutMapping("/{code}")
    public void update(@PathVariable int code,
                       @RequestBody Challenge item) {

        item.setCode(code);

        challengeService.update(item);
    }

<<<<<<< Updated upstream
    // 삭제
    @DeleteMapping("/{code}")
    public void delete(@PathVariable int code) {
        challengeService.delete(code);
    }
}
=======
  // 삭제
  @DeleteMapping("/{code}")
  public void delete(@PathVariable int code) {
    challengeService.delete(code);
  }
}
=======
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
>>>>>>> Stashed changes
>>>>>>> Stashed changes
