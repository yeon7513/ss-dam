package com.ss_dam.common.likes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.likes.request.FeedLikeRequest;
import com.ss_dam.common.likes.service.LikeService;

@RestController
@RequestMapping("/api/user/feed/like")
public class UserFeedLikeController {

    @Autowired
    LikeService likeService;

    // 피드 좋아요 등록
    @PostMapping
    public ApiResponse<Void> registerFeedLike(
            @RequestBody FeedLikeRequest request) {

        likeService.registerFeedLike(
                request.getFeedCode(),
                request.getMemCode()
        );

        return ApiResponse.success(
                "피드 좋아요 등록에 성공했습니다",
                null
        );
    }


    // 피드 좋아요 취소
    @DeleteMapping
    public ApiResponse<Void> deleteFeedLike(
            @RequestBody FeedLikeRequest request) {

        likeService.deleteFeedLike(
                request.getFeedCode(),
                request.getMemCode()
        );

        return ApiResponse.success(
                "피드 좋아요 취소에 성공했습니다",
                null
        );
    }
}