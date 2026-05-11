package com.ss_dam.feed.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.comment.Comment;
import com.ss_dam.comment.service.CommentService;
import com.ss_dam.feed.Feed;
import com.ss_dam.feed.FeedHashtag;
import com.ss_dam.feed.dao.FeedDao;
import com.ss_dam.global.image.Images;
import com.ss_dam.global.image.service.ImageService;
import com.ss_dam.global.likes.service.LikeService;

@Service
public class FeedServiceImpl implements FeedService {

  @Autowired
  LikeService likeService;
  @Autowired
  CommentService commentService;
  @Autowired
  MemberService memberService;
  @Autowired
  FeedHashtagService feedHashtagService;
  @Autowired
  ImageService imageService;

  @Autowired
  FeedDao feedDao;

  @Override
  public List<Feed> searchFeeds() {
    return feedDao.searchFeeds();
  }

  @Override
  public Feed searchFeedByCode(Long code) {
    Feed feed = feedDao.searchFeedByCode(code);

    if (feed == null) {
      return null;
    }

    // 작성자 프로필 정보
    List<MemberProfile> memberProfile = memberService.searchProfileByMemberCode(feed.getMemCode());
    feed.setMemberProfiles(memberProfile);

    // 이미지 리스트
    List<Images> images = imageService.searchImagesByCode("feed", code);
    feed.setImages(images);

    // 해시태그 리스트
    List<FeedHashtag> feedHashtags = feedHashtagService.searchHashtagByFeedCode(code);
    feed.setHashtags(feedHashtags);

    // 댓글 리스트
    List<Comment> comments = commentService.searchCommentsByFeedCode(code);
    feed.setComments(comments);

    // 좋아요 & 댓글 개수
    int countFeedLike = likeService.countFeedLike(code);
    int countComment = commentService.countComment(code);
    feed.setCountFeedLike(countFeedLike);
    feed.setCountComment(countComment);

    return feed;
  }

}
