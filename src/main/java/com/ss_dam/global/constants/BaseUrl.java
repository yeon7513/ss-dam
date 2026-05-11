package com.ss_dam.global.constants;

public class BaseURL {
  private static final String IMG_URL = "http://localhost:9090/images";
  private static final String UPLOAD_PATH = "d:/prodect_ssdam/uploads";

  public static String getImgUrl() {
    return IMG_URL;
  }

  public static String getUploadPath() {
    return UPLOAD_PATH;
  }
}
