package com.ss_dam.common;


// 필요할때마다 가져다 써서 프론트 엔드에 일관적인 형태(JSON)로 보내려고 만들어 놓은거
public class ApiResponse<T> {
	private boolean success;
	private String message; //사용자한테 보내려는 응답 메세지
	private T data; //T 데이터 타입은 그냥 들어오는 데이터 값대로 바뀌는 데이터 타입


  public static <T> ApiResponse<T> success(String message, T data) {
    return new ApiResponse<>(true, message, data);
  }

  public static <T> ApiResponse<T> fail(String message) {
    return new ApiResponse<>(false, message, null);
  }
}
