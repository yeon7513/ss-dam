package com.ss_dam.global.image;

public class Images {
  private Long code;
  private Long targetCode;
  private String type;
  private String path;
  private String filename;

  // 프론트엔드 전송용 필드
  private String imageURL;

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public Long getTargetCode() {
    return targetCode;
  }

  public void setTargetCode(Long targetCode) {
    this.targetCode = targetCode;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public String getFilename() {
    return filename;
  }

  public void setFilename(String filename) {
    this.filename = filename;
  }

  public String getImageURL() {
    return imageURL;
  }

  public void setImageURL(String imageURL) {
    this.imageURL = imageURL;
  }

}
