package com.ss_dam.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RootConfig implements WebMvcConfigurer {

  // 참고
  // https://itconquest.tistory.com/entry/Spring-Boot-WebMvcConfigurer-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0


  // 리액트와의 통신을 허용함 (CORS 설정)
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("http://localhost:5173")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowCredentials(true);
  }

  // 로컬 경로 매핑 (이 코드는 수정X, 똑같은 위치에 만들어주세요!)
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/images/**")
        .addResourceLocations("file:///d:/project_ssdam/uploads/");
  }

}
