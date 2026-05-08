package com.ss_dam.global.image;

import java.net.MalformedURLException;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.global.image.service.ImageService;

@RestController
@RequestMapping("/images")
public class ImageController {

  private final ImageService imageService;

  public ImageController(ImageService imageService) {
    this.imageService = imageService;
  }

  // 이미지 업로드 (게시글용)
  @PostMapping("/uploadImages")
  public ResponseEntity<String> uploadImages(@RequestParam("file") MultipartFile file,
      @RequestParam("folder") String folder) {
    try {
      String imageUrl = imageService.uploadImage(file, folder);

      return ResponseEntity.ok(imageUrl);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
    }
  }


  // 업로드 된 이미지 불러오기
  @GetMapping("/uploads/{folder}/{fileName:.+}")
  public ResponseEntity<Resource> getImage(@PathVariable String folder,
      @PathVariable String fileName) throws MalformedURLException {

    // 이미지 파일을 서비스에서 가져오기
    Resource resource = imageService.loadImage(folder, fileName);

    if (resource == null) { // 이미지가 없을 경우 404 처리
      return ResponseEntity.notFound().build();
    }

    // 확장자 추출
    String contentType = "application/octet-stream"; // 기본값: 이진 데이터
    String ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

    // 파일 확장자 기준으로 Content-Type 설정
    switch (ext) {
      case "jpg":
      case "jpeg":
        contentType = MediaType.IMAGE_JPEG_VALUE;
        break;
      case "png":
        contentType = MediaType.IMAGE_PNG_VALUE;
        break;
      case "gif":
        contentType = MediaType.IMAGE_GIF_VALUE;
        break;

    }

    // 이미지 리소스 반환
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, contentType).body(resource);
  }

}
