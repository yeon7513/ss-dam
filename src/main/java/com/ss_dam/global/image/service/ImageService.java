package com.ss_dam.global.image.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.global.image.Images;

public interface ImageService {

  // OLD
  String uploadImage(MultipartFile file, String folder) throws IOException;

  // Resource loadImage(String folder, String fileName) throws MalformedURLException;

  List<Images> searchImagesByCode(String type, Long code);

  // 업로드 (테스트중!)
  List<Images> uploadImages(List<MultipartFile> files, String type, Long targetCode);

  List<Images> searchImages();

}
