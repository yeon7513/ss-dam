package com.ss_dam.common.image.service;

import com.ss_dam.common.image.model.Images;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

  List<Images> loadImages();

  List<Images> findImagesByCode(String type, Long targetCode);

  // 업로드 (테스트중!)
  void uploadImages(List<MultipartFile> files, String type, Long targetCode);

  void uploadSingleImage(MultipartFile file, String type, Long targetCode);

  Images uploadSingleImage(MultipartFile file, String type, Long targetCode, int seq);

  void deleteImagesByTargetCode(String type, Long targetCode);
}
