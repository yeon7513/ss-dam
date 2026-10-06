package com.ss_dam.common.validator;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.common.pager.PageQuery;

@Component 
public class PageQueryValidator {

  // Validator: 제목·내용 길이, 필수값, 날짜 순서, 페이지 범위, 번호가 양수인지, 허용된 상태값인지 검사
  //DB 조회 검사 제외 -> ex) requireChallengeExists() 는 기존 AdminChallengeServiceImpl에 작성
  // 각 서비스에 남기는 검증은 존재 여부, 수정·삭제·완료·복구 가능 상태, DB 저장 결과 검사
  

  //PageQueryValidator: 페이지 번호·크기·offset 범위
   public void validate(PageQuery query) {

        if (query == null
                || query.getPage() < 1
                || query.getPerPage() < 1
                || query.getPerPage() > 100
                || query.getPerGroup() < 1
                || query.getPerGroup() > 10) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "page는 1 이상, perPage는 1~100, "
                            + "perGroup은 1~10이어야 합니다.");
        }

        long offset =
                ((long) query.getPage() - 1) * query.getPerPage();

        if (offset > Integer.MAX_VALUE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "조회 가능한 페이지 범위를 초과했습니다.");
        }
    }
}
