package com.ss_dam.common.image.service;

import com.ss_dam.common.image.dao.ImageDao;
import com.ss_dam.common.image.model.Images;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ImageServiceImpl implements ImageService {

  @Autowired
  ImageDao imageDao;

  @Value("${kopo.upload.path}")
  private String uploadPath;

  // DB에서 이미지 경로 반환하기
  @Override
  public List<Images> findImagesByCode(String type, Long targetCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("type", type);
    params.put("targetCode", targetCode);

    List<Images> images = imageDao.findImagesByCode(params);

    return images;
  }

  // 전체 이미지 불러오기 (테스트용)
  @Override
  public List<Images> loadImages() {
    return imageDao.loadImages();
  }

  // 참고
  // https://velog.io/@lehdqlsl/Spring-boot-HTTP-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-Request-%EC%B2%98%EB%A6%AC-RequestParam-%ED%8E%B8
  // https://velog.io/@mypalebluedot29/React-Spring-Boot-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EA%B8%B0%EB%8A%A5
  // https://chan-it-note.tistory.com/41

  // 이미지 리스트 등록
  @Override
  public void uploadImages(List<MultipartFile> files, String type, Long targetCode) {
    List<Images> images = new ArrayList<>();

    // 이미지 업로드 시작
    if (files != null && !files.isEmpty()) {
      for (int i = 0; i < files.size(); i++) {
        MultipartFile file = files.get(i);

        // 이미지 단일 등록 메소드를 반복으로 돌림
        Images uploaded = uploadSingleImage(file, type, targetCode, i + 1);

        if (uploaded != null) {
          images.add(uploaded);
        }
      }
    }
  }

  // 단일 이미지 등록 시 이미지 순서를 1로 고정 (프로필 사진 같은거..)
  @Override
  public void uploadSingleImage(MultipartFile file, String type, Long targetCode) {
    uploadSingleImage(file, type, targetCode, 1);
  }

  // 단일 이미지 등록 (이미지 리스트용)
  @Override
  public Images uploadSingleImage(MultipartFile file, String type, Long targetCode, int seq) {
    // MultipartFile file -> 파일 객체
    // String type -> 어디에 등록된건지? (피드, 마켓, 프로필 등 폴더명으로 사용할 것)
    // Long targetCode -> 이미지가 속해 있는 대상의 고유 번호
    // int seq -> 이미지 순서 (이미지 목록일 경우)

    // 날짜 객체 생성 -> 문자열 포맷 (폴더용)
    LocalDate now = LocalDate.now();
    String date = now.format(DateTimeFormatter.ofPattern("yyyy.MM"));

    // 경로 조합 (ex: 최상위루트/대상/날짜/)
    String path = uploadPath + File.separator + type + File.separator + date + File.separator;

    // 폴더가 없으면 생성
    File folder = new File(path);
    if (!folder.exists()) {
      folder.mkdirs();
    }

    // 파일명 설정
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
      image.setOrderSeq(seq);
      image.setDeleteYn(false);

      // DB에 INSERT
      imageDao.registerImages(image);

      return image;

    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // 이미지 삭제 시 주의사항!
  // DB의 경우 트랜젝션으로 묶이기 때문에 복구가 가능함.
  // 하지만 물리적인 삭제는 복구가 안됨..
  // 그렇기 때문에 DB 작업을 전부 다 처리한 후 문제가 없을 경우 물리적으로 삭제해야한다.
  // -> 그럼 DB는 삭제되고, 실제 파일의 경로와 이름은 어떻게 처리할까?
  // --> 자바의 메모리 영역에 삭제할 파일 목록을 임시로 저장한다!

  // DB의 이미지 테이블에서 해당하는 컬럼만 삭제
  @Transactional
  @Override
  public void deleteImagesByTargetCode(String type, Long targetCode) {
    // DB에서 삭제 전 메모리에 삭제할 파일 정보를 미리 담아둠
    List<Images> existingImages = findImagesByCode(type, targetCode);

    // 없으면 실행 X
    if (existingImages == null || existingImages.isEmpty()) {
      return;
    }

    Map<String, Object> params = new HashMap<>();
    params.put("type", type);
    params.put("targetCode", targetCode);

    // DB 작업을 먼저 하고 여기서 오류가 날 경우 롤백 (이 밑으로 코드 실행 X)
    imageDao.deleteImagesByTargetCode(params);

    // DB 작업 성공 시 메모리에 남아있는 경로 정보를 바탕으로 물리적 삭제 구현
    for (Images image : existingImages) {
      deletePhysicalImages(image.getPath());
    }
  }

  // DB 저장 경로에 해당하는 실제 파일을 삭제
  private void deletePhysicalImages(String imagePath) {
    // 이미지가 없는 경우 실행 X
    if (imagePath == null || imagePath.isEmpty()) {
      return;
    }

    // [DB에 저장된 경로를 절대 경로로 변환]
    // 첫번째로 오는 "/images/"를 떼버리고 (이미지 파일 중간에 포함될 경우 찾을 수 없으니까..)
    String relativePath = imagePath.replaceFirst("^/images/", "");
    // 절대경로(uploadPath)를 붙여 파일 구분자로 전부 치환
    String absolutePath = uploadPath + File.separator + relativePath.replace("/", File.separator);

    File file = new File(absolutePath);
    // 대상 루트에 파일이 존재한다면 삭제
    if (file.exists()) {
      file.delete();
    }
  }

}
