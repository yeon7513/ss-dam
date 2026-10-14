package com.ss_dam.common.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.auth.member.service.MemberAccessService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

// 이미 로그인한 사용자가 나중에 정지·강제 탈퇴된 경우, 다음 API 요청부터 차단하는 역할

// 관련된 코드 위치 목록
// admin/report 
// auth/member/service/MemberAccessService
// auth/login/service/LoginServiceImpl

//차단 시 세션을 지우지 않고 403을 반환. 따라서 같은 세션에서 계속 검사되고, 제재 취소나 정지 만료 후에는 다시 통과
// 이 인터셉터는 비회원 인증을 대신하지 않으므로, 회원 전용 API의 requireMember() 등은 유지

@Component
public class MemberAccessInterceptor implements HandlerInterceptor {

    private final MemberAccessService memberAccessService;

    public MemberAccessInterceptor(
            MemberAccessService memberAccessService) {

        this.memberAccessService = memberAccessService;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) {

        // 브라우저 CORS 사전 요청은 통과
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // 로그인·로그아웃은 제재 상태에서도 요청 가능
        // 로그인 자체의 제재 검사는 LoginServiceImpl에서 수행
        String path = request.getRequestURI()
                .substring(request.getContextPath().length());

        if ("POST".equalsIgnoreCase(request.getMethod())
                && ("/api/auth/login".equals(path)
                    || "/api/auth/logout".equals(path))) {
            return true;
        }

        // 기존 세션만 조회: 불필요한 새 세션 생성 방지
        HttpSession session = request.getSession(false);

        if (session == null) {
            return true;
        }

        Object value = session.getAttribute("loginUser");

        if (!(value instanceof AuthProfile loginUser)) {
            return true;
        }

        // 관리자 계정은 회원 제재 검사 대상이 아님
        if ("MEMBER".equalsIgnoreCase(loginUser.getRole())) {
            memberAccessService.checkMemberAccess(
                    loginUser.getCode());
        }

        return true;
    }
}