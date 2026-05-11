package com.ss_dam.global.image.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.global.image.Images;
import com.ss_dam.global.image.service.ImageService;

@RestController
@RequestMapping("/images")
public class ImageController {

  @Autowired
  ImageService imageService;

  // 이미지 업로드 (테스트용)
  @PostMapping
  public ResponseEntity<?> uploadImages(@RequestParam List<MultipartFile> files,
      @RequestParam String type, @RequestParam Long targetCode) {

    try {
      List<Images> images = imageService.uploadImages(files, type, targetCode);

      return ResponseEntity.ok().body(images);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
    }
  }

}
