package com.ss_dam.common.image.service;

import com.ss_dam.common.image.model.Images;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

  List<Images> searchImages();

  List<Images> searchImagesByCode(String type, Long code);

  // 업로드 (테스트중!)
  List<Images> uploadImages(List<MultipartFile> files, String type, Long targetCode);

  Images uploadSingleImage(MultipartFile file, String type, Long targetCode);

  Images uploadSingleImage(MultipartFile file, String type, Long targetCode, int seq);

}
