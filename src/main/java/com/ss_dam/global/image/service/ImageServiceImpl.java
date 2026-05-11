package com.ss_dam.global.image.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ss_dam.global.constants.BaseURL;
import com.ss_dam.global.image.Images;
import com.ss_dam.global.image.dao.ImageDao;

@Service
public class ImageServiceImpl implements ImageService {
  @Autowired
  ImageDao imageDao;

  // 이미지 업로드 메소드
  public String uploadImage(MultipartFile file, String folder) throws IOException {

    // 파일 객체가 없거나 비어있으면 null로 설정
    if (file == null || file.isEmpty())
      return null;

    // 폴더 경로 설정
    // -> BASE_UPLOAD_PATH/폴더명/
    String uploadDir = Paths.get(BaseURL.getBaseUploadPath(), folder).toString();
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

  // 브라우저로 이미지 반환
  public Resource loadImage(String folder, String fileName) throws MalformedURLException {

    // 이미지 경로
    Path path = Paths.get(BaseURL.getBaseUploadPath(), folder, fileName);
    // 파일 경로 읽어서 resource에 저장
    Resource resource = new UrlResource(path.toUri());

    if (!resource.exists() || !resource.isReadable())
      return null; // 이미지가 없거나 읽을 수 없다면 null 반환

    return resource;
  }

  @Override
  public List<Images> searchImagesByCode(String type, Long code) {
    Map<String, Object> params = new HashMap<>();

    params.put("type", type);
    params.put("code", code);

    List<Images> images = imageDao.searchImagesByCode(params);

    return images;
  }

}
