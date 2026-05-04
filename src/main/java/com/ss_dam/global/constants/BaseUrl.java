package com.ss_dam.global.constants;

public class BaseUrl {
  private static final String IMG_URL = "http://localhost:9090/images";
  private static final String BASE_UPLOAD_PATH = "D:/ssdam/uploads";

  public static String getImgUrl() {
    return IMG_URL;
  }

  public static String getBaseUploadPath() {
    return BASE_UPLOAD_PATH;
  }

}
