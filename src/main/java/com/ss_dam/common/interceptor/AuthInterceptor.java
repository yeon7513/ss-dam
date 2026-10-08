package com.ss_dam.common.interceptor;

import com.ss_dam.auth.login.model.response.AuthProfile;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class AuthInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {

    // false 를 써놓지 않으면 요청이 들어올때마다
    // 계속해서 세션을 생성해서 과부화가 걸릴 수 있음
    HttpSession session = request.getSession(false);

    String requestURI = request.getRequestURI();

    // WebMvcConfig.java에서 모든 경로를 인터셉터가 감시해야 하기 때문에
    // HTTP Method를 전부 가져옴
    String method = request.getMethod();

    AuthProfile user = (AuthProfile) session.getAttribute("loginUser");

    System.out.println(">>> 인터셉터 가로챔: " + requestURI);

    // 비로그인 사용자 처리
    if (user == null) {

      // 비회원이 일반 회원 전용 쓰기(POST), 수정(PATCH or PUT), 삭제(DELETE) 요청을 하거나
      // 관리자 전용 URL로 접근할 경우 401
      if (isMemberOnlyRequest(requestURI, method) || requestURI.startsWith(
          "/admin") || requestURI.startsWith("/api/admin")) {
        System.out.println(">>> 세션 없음(비로그인 상태)");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED); // 401 (로그인 필요)
        return false;
      }

      // 그 외 GET 요청은 비회원이여도 통과
      return true;
    }

    System.out.println(">>> 접속 유저 Role: " + user.getRole());

    // 일반 회원이 관리자 전용 URL에 접근 시
    if (requestURI.startsWith("/admin") || requestURI.startsWith("/api/admin")) {
      if ("MEMBER".equalsIgnoreCase(user.getRole())) {
        System.out.println(">>> 권한 없음! 403 리턴");
        response.sendError(HttpServletResponse.SC_FORBIDDEN); // 403 (권한 없음)

        return false;
      }
    }

    // 관리자가 일반 회원 전용 URL에 접근 시
    if (isMemberOnlyRequest(requestURI, request.getMethod())) {
      if (!"MEMBER".equalsIgnoreCase(user.getRole())) {
        response.sendError(HttpServletResponse.SC_FORBIDDEN);
        System.out.println(">>> 관리자는 회원 전용 서비스 이용 불가");
        
        return false;
      }
    }

    System.out.println(">>> 인터셉터 통과");
    return true;
  }


  // 일반 회원 전용 API 패턴 판별 메소드
  private boolean isMemberOnlyRequest(String uri, String method) {
    // 단순 조회(GET)를 제외한 쓰기/수정/삭제 요청이거나
    // 회원 전용 엔드포인트인 경우
    boolean isWriteAction = "POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(
        method) || "DELETE".equalsIgnoreCase(method) || "PATCH".equalsIgnoreCase(method);

    if (isWriteAction) {
      // 반환값에 빠진 거 있으면 추가!!
      return uri.startsWith("/api/feeds") // 피드
          || uri.startsWith("/api/markets") // 마켓
          || uri.startsWith("/api/comments") // 댓글
          || uri.startsWith("/api/challenges") // 챌린지
          ;
    }
    return false;
  }
}
