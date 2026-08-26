package com.ss_dam.common.config;

// 인터셉터 잠시 꺼두려고 주석처리

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ss_dam.common.interceptor.AuthInterceptor;

//@Configuration
//public class WebMvcConfig implements WebMvcConfigurer {
//	
//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(new AuthInterceptor())
//				.addPathPatterns("/api/member/**","/api/admin/**", "/member/**", "/admin/**");
//	}
//}
