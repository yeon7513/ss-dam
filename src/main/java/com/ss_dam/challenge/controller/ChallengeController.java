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

    // 전체 조회
    @GetMapping
    public List<Challenge> getAllChallenges() {
        return challengeService.findAll();
    }

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

    // 삭제
    @DeleteMapping("/{code}")
    public void delete(@PathVariable int code) {
        challengeService.delete(code);
    }
}