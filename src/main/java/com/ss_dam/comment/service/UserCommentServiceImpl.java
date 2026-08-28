package com.ss_dam.comment.service;

import com.ss_dam.comment.Comment;
import com.ss_dam.comment.dao.UserCommentDao;
import com.ss_dam.comment.model.request.CommentCreate;
import com.ss_dam.comment.model.response.UserCommentView;
import com.ss_dam.common.pager.Pager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserCommentServiceImpl implements UserCommentService {

  @Autowired
  UserCommentDao userCommentDao;

  // 피드에서 호출하는 댓글리스트
  @Override
  public List<UserCommentView> findCommentsByFeedCode(Long feedCode, Pager pager, Long memberCode) {

    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("feedCode", feedCode);
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return userCommentDao.findCommentsByFeedCode(params);
  }

  //댓글 등록 (임시)
  @Override
  public CommentCreate registerComment(CommentCreate comment) {
    if (comment == null){
      throw new IllegalArgumentException("댓글 정보가 필요합니다");
    }
    if (comment.getFeedCode() == null) {
      throw new IllegalArgumentException("피드 번호가 필요합니다.");
    }

    if (comment.getMemCode() == null) {
      throw new IllegalArgumentException("회원 번호가 필요합니다.");
    }

    // 별도의 예외 처리기 추가 예정
    // 잘못된 요청이므로 원래는 400 Bad Request가 적절. 추후 @RestControllerAdvice를 추가
    if (comment.getContent() == null || comment.getContent().isBlank()) {
      throw new IllegalArgumentException("댓글 내용을 입력해주세요.");
    }


    //서버에서 관리할 값 설정
    comment.setContent(comment.getContent().trim());

    int insertedRows = userCommentDao.registerComment(comment);

    if (insertedRows != 1) {
      throw new IllegalStateException("댓글 등록에 실패했습니다.");
    }

    return comment;
  }


  /* 
  //댓글 등록(세션 확인)
  @Override
  public CommentCreate registerComment(
    CommentCreate request, Long memberCode) {


      //1.요청 객체 확인
      if(request == null){
        throw new IllegalArgumentException("댓글 정보가 필요합니다");
      }

      //2.피드 번호 확인
      if(request.getFeedCode() == null){
        throw new IllegalArgumentException("피드 번호가 필요합니다");
      }

      //3.회원 번호 확인
      if(memberCode == null){
        throw new IllegalArgumentException("회원 번호가 필요합니다");
      }

      //4.댓글 내용 확인
      if(request.getContent() == null
        || request.getContent().isBlank()) {
          throw new IllegalArgumentException("댓글 내용을 입력해주세요");
        }

      //다음 두 가지를 검사합니다.
        //- request.getContent() == null
         //- 댓글 내용 자체가 없는 경우
        //- request.getContent().isBlank()
         // - 빈 문자열이거나 공백만 입력한 경우

      // Java의 ||는 왼쪽부터 검사. 내용이 null이면 오른쪽의 isBlank()를 실행하지 않기 때문에 NullPointerException도 방지

      //5.요청DTO와 세션 정보를 이용해 서버에서 Comment 조립
      //5-1.Comment 객체 생성
      Comment comment = new Comment();

      //DB에 저장할 댓글 정보를 담기 위해 새로운 Comment 객체를 생성
      //CommentCreate request에는 클라이언트가 입력한 값만 있고, Comment에는 DB 저장에 필요한 전체 정보가 들어갑니다.

      //5-2.피드 번호 설정
      comment.setsFeedCode(request.getFeedCode());
      //요청 DTO에 들어 있는 피드 번호를 Comment 객체에 넣습니다.
      //request의 feedCode → comment의 feedCode, 이 값으로 어느 피드에 작성된 댓글인지 구분

      //5-3.댓글 작성자 설정
      comment.setMemCode(memberCode);
      //Controller가 로그인 세션에서 가져온 회원 번호를 댓글 작성자로 설정.
      //클라이언트가 보낸 회원 번호를 사용하지 않기 때문에, 다른 회원인 것처럼 댓글 등록 하는 것을 방지

      //5-4.댓글 내용 설정
      comment.setContent(request.getContent().trim());
      //클라이언트가 입력한 댓글에서 앞 뒤 공백을 제거한 후 저장 
      //문장 중간 공백 제거X

      //5-5.상태와 삭제 여부 설정
      comment.status("active");
      comment.setDeleteYn(false);
      //클라이언트가 임의로 지정하지 못하도록 서버가 초기값을 설정합니다.
        //- status = "active": 활성 상태의 댓글
        //- deleteYn = false: 삭제되지 않은 댓글
      //즉, 새 댓글은 항상 활성 상태이고 삭제되지 않은 상태로 등록됩니다.

      //6.DAO를 통해 DB에 저장
      int insertedRows = userCommnetDao.


*/

    }



    

