package com.ss_dam.common.image.dao;

import com.ss_dam.common.image.model.Images;

import java.util.List;
import java.util.Map;

public interface ImageDao {

  List<Images> findImagesByCode(Map<String, Object> params);

  void registerImages(Images image);

  List<Images> loadImages();

  void deleteImagesByFilename(Map<String, Object> params);

  void updateImageOrderSeq(Map<String, Object> params);
}
