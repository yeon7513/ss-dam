package com.ss_dam.common.config;

// 인터셉터 잠시 꺼두려고 주석처리

//import com.ss_dam.common.interceptor.AuthInterceptor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebMvcConfig implements WebMvcConfigurer {
//
//  @Override
//  public void addInterceptors(InterceptorRegistry registry) {
//    registry.addInterceptor(new AuthInterceptor())
//        // 전체 경로를 인터셉터 감시 대상으로 지정
//        .addPathPatterns("/**")
//        // 비로그인 사용자도 접근해야 하는 공용 URL은 예외 처리
//        // -> 빠진거 있으면 추가...
//        .excludePathPatterns("/", "/api/auth/login", // 로그인
//            "/api/member/**", // 회원가입 및 아이디 중복 체크
//            "/api/auth/find/**", // 아이디 & 비밀번호 찾기
//            "/error" // 콘솔에 지저분하게 남기 때문에 추가
//        );
//  }
//}
