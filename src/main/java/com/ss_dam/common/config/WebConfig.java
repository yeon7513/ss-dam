package com.ss_dam.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  // 참고
  // https://itconquest.tistory.com/entry/Spring-Boot-WebMvcConfigurer-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0


  // 리액트와의 통신을 허용함 (CORS 설정)
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("http://localhost:5173") // 리액트 서버 주소
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용된 HTTP Method
        .allowCredentials(true); // 쿠키 연동 허용
  }


  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // 이미지 폴더 경로 매핑
    registry.addResourceHandler("/images/**").addResourceLocations("${kopo.upload.url}");

    registry.addResourceHandler("/**").addResourceLocations("classpath:/static/")
        .resourceChain(true).addResolver(new PathResourceResolver() {

          @Override
          protected Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource requestedResource = location.createRelative(resourcePath);

            if (requestedResource.exists() && requestedResource.isReadable()) {
              return requestedResource;
            }

            if (resourcePath.startsWith("api/")) {
              return null;
            }

            return new ClassPathResource("/static/index.html");
          }
        });
  }

}
