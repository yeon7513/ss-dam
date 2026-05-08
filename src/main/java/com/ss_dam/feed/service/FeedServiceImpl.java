package com.ss_dam.feed.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.auth.member.Member;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.comment.service.CommentService;
import com.ss_dam.feed.Feed;
import com.ss_dam.feed.dao.FeedDao;
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
  public Feed searchDetail(Long code) {
    Feed feed = feedDao.searchDetail(code);

    if (feed == null) {
      return null;
    }

    Member member = memberService.searchProfileById(feed.getMemberId());

    // 작성자 정보
    feed.setProfileImg(member.getProfileImg());
    feed.setRanking(member.getRanking());

    // 이미지 리스트
    feed.setImages(imageService.searchFeedImagesByFeedCode(code));

    // 해시태그 리스트
    feed.setHashtags(feedHashtagService.seacrchHashtagByFeedCode(code));

    // 댓글 리스트
    feed.setComments(commentService.searchCommentsByFeedCode(code));

    // 좋아요 & 댓글 개수
    feed.setCountFeedLike(likeService.countFeedLike(code));
    feed.setCountComment(commentService.countComment(code));

    return feed;
  }

}
