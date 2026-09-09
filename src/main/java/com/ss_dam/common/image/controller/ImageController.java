package com.ss_dam.common.image.controller;

import com.ss_dam.common.ApiResponse;
import com.ss_dam.common.image.model.Images;
import com.ss_dam.common.image.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

  @Autowired
  ImageService imageService;

  // 이미지 전체 리스트 (테스트용)
  @GetMapping
  public ResponseEntity<ApiResponse<List<Images>>> searchImages() {
    List<Images> images = imageService.loadImages();

    return ResponseEntity.ok(ApiResponse.success("이미지 전체 목록 조회 성공", images));
  }

  // // 이미지 업로드 (테스트용) -> TEST OK
  // @PostMapping
  // ResponseEntity<?> uploadImages(@RequestParam List<MultipartFile> files, @RequestParam String
  // type,
  // @RequestParam Long targetCode) {
  //
  // try {
  // List<Images> images = imageService.uploadImages(files, type, targetCode);
  //
  // return ResponseEntity.ok().body(images);
  // } catch (Exception e) {
  // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
  // }
  // }

}
