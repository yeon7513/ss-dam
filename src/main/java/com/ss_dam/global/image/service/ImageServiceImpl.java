package com.ss_dam.global.image.service;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.global.constants.BaseURL;
import com.ss_dam.global.image.Images;
import com.ss_dam.global.image.dao.ImageDao;

@Service
public class ImageServiceImpl implements ImageService {

  @Autowired
  ImageDao imageDao;

  // DB에서 이미지 경로 반환하기
  @Override
  public List<Images> searchImagesByCode(String type, Long code) {
    Map<String, Object> params = new HashMap<>();

    params.put("type", type);
    params.put("code", code);

    List<Images> images = imageDao.searchImagesByCode(params);

    return images;
  }

  // 전체 이미지 불러오기 (테스트용)
  @Override
  public List<Images> searchImages() {
    return imageDao.searchImages();
  }

  // 참고
  // https://velog.io/@lehdqlsl/Spring-boot-HTTP-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-Request-%EC%B2%98%EB%A6%AC-RequestParam-%ED%8E%B8
  // https://velog.io/@mypalebluedot29/React-Spring-Boot-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EA%B8%B0%EB%8A%A5
  // https://chan-it-note.tistory.com/41

  @Override
  public List<Images> uploadImages(List<MultipartFile> files, String type, Long targetCode) {
    List<Images> images = new ArrayList<Images>();

    // 이미지 업로드 시작
    if (files != null && !files.isEmpty()) {
      for (MultipartFile file : files) {
        Images uploaded = uploadSingleImage(file, type, targetCode);

        if (uploaded != null) {
          images.add(uploaded);
        }
      }
      // 이미지 반환
      return images;
    } else {
      return null;
    }
  }

  @Override
  public Images uploadSingleImage(MultipartFile file, String type, Long targetCode) {
    // 날짜 객체 생성 -> 문자열 포맷
    LocalDate now = LocalDate.now();
    String date = now.format(DateTimeFormatter.ofPattern("yyyy.MM"));

    // 경로 조합
    String path =
        BaseURL.getUploadPath() + File.separator + type + File.separator + date + File.separator;

    // 폴더가 없으면 생성
    File folder = new File(path);
    if (!folder.exists()) {
      folder.mkdirs();
    }

    String filename = file.getOriginalFilename();
    String uuid = UUID.randomUUID().toString();

    // DB 저장용 PATH
    String imageURL = "/images/" + type + "/" + date + "/" + uuid + "_" + filename;

    try {
      file.transferTo(new File(path + uuid + "_" + filename));

      Images image = new Images();
      image.setTargetCode(targetCode);
      image.setType(type);
      image.setPath(imageURL);
      image.setDeleteYn(false);

      // DB에 INSERT
      imageDao.registerImages(image);

      return image;

    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

}
