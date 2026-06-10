package com.ss_dam.common.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import com.ss_dam.auth.login.Login;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class AuthInterceptor implements HandlerInterceptor {
		
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		HttpSession session = request.getSession(false); //false 를 써놓지 않으면 요청이 들어올때마다 계속해서 세션을 생성해서 과부화가 걸릴 수 있음
		String requestURI = request.getRequestURI();
		
		System.out.println(">>> 인터셉터 가로챔: " + requestURI);
		
		if(session == null || session.getAttribute("loginUser") == null ) {
			System.out.println(">>> 세션 없음(비로그인 상태)");
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED); //401 (로그인 필요)
			
			return false;
		}
		
		Login user = (Login)session.getAttribute("loginUser");
		System.out.println(">>> 접속 유저 Role: " + user.getRole());
		
		if(requestURI.startsWith("/admin")) {
			if(!"ADMIN".equals(user.getRole())) {
				System.out.println(">>> 권한 없음! 403 리턴");
				response.sendError(HttpServletResponse.SC_FORBIDDEN); //403 (권한 없음)
				
				return false;
			}
		}
		System.out.println(">>> 인터셉터 통과");
		
		return true;
	}
}
