package com.ss_dam.global.image.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.global.image.Images;

public interface ImageService {

  List<Images> searchImages();

  List<Images> searchImagesByCode(String type, Long code);

  // 업로드 (테스트중!)
  List<Images> uploadImages(List<MultipartFile> files, String type, Long targetCode);

  Images uploadSingleImage(MultipartFile file, String type, Long targetCode);

}
