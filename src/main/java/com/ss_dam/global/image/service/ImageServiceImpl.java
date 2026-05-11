package com.ss_dam.global.image.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
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

  // 참고
  // https://velog.io/@lehdqlsl/Spring-boot-HTTP-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-Request-%EC%B2%98%EB%A6%AC-RequestParam-%ED%8E%B8
  // https://velog.io/@mypalebluedot29/React-Spring-Boot-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EA%B8%B0%EB%8A%A5
  // https://chan-it-note.tistory.com/41

  // 업로드 테스트!!
  @Override
  public List<Images> uploadImages(List<MultipartFile> files, String type, Long targetCode) {
    // 테스트용 images -> 나중에 삭제할 것!!
    List<Images> images = new ArrayList<Images>();

    // 날짜 객체 생성 -> 문자열 포맷
    LocalDate now = LocalDate.now();
    String date = now.format(DateTimeFormatter.ofPattern("yyyy.MM"));

    // 경로 조합
    String path = BaseURL.getUploadPath() + File.separator + type + File.separator + date;

    // 폴더가 없으면 생성
    File folder = new File(path);
    if (!folder.exists()) {
      folder.mkdirs();
    }

    // 이미지 업로드 시작
    if (files != null && !files.isEmpty()) {
      for (MultipartFile file : files) {
        if (!file.isEmpty()) {
          String filename = file.getOriginalFilename();
          String uuid = UUID.randomUUID().toString();

          // DB 저장용 PATH
          String imageURL = "/images/" + type + "/" + date + "/" + uuid + "/" + filename;

          try {
            file.transferTo(new File(path + uuid + "_" + filename));

            Images image = new Images();
            image.setTargetCode(targetCode);
            image.setType(type);
            image.setPath(imageURL);
            image.setDeleteYn(false);

            // DB에 INSERT
            imageDao.registerImages(image);

            images.add(image);

          } catch (Exception e) {
            e.printStackTrace();
          }

        }
      }
    }

    // 이미지 반환 -> 피드, 마켓, 프로필 사진 등 바로 setter에 넣음
    // 프로필 사진은 단일인데, List로 넣어도 될까??
    return images;
  }

  // 이미지 업로드 메소드
  public String uploadImage(MultipartFile file, String folder) throws IOException {

    // 파일 객체가 없거나 비어있으면 null로 설정
    if (file == null || file.isEmpty()) {
      return null;
    }

    // 폴더 경로 설정
    // -> BASE_UPLOAD_PATH/폴더명/
    String uploadDir = Paths.get(BaseURL.getUploadPath(), folder).toString();
    File dir = new File(uploadDir);

    // 폴더가 존재하지 않을 경우 새로운 폴더 생성
    if (!dir.exists())
      dir.mkdirs();

    // 파일 이름 설정
    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
    // 파일 객체를 문자열(경로)로 변경
    file.transferTo(new File(uploadDir, fileName));

    // 완성된 경로 반환
    return "/uploads/" + folder + "/" + fileName;
  }

  // // 브라우저로 이미지 반환
  // public Resource loadImage(String folder, String fileName) throws MalformedURLException {
  //
  // // 이미지 경로
  // Path path = Paths.get(BaseURL.getBaseUploadPath(), folder, fileName);
  // // 파일 경로 읽어서 resource에 저장
  // Resource resource = new UrlResource(path.toUri());
  //
  // if (!resource.exists() || !resource.isReadable())
  // return null; // 이미지가 없거나 읽을 수 없다면 null 반환
  //
  // return resource;
  // }



}
