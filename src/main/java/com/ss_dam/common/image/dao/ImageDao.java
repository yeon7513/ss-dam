package com.ss_dam.common.image.dao;

import com.ss_dam.common.image.model.Images;

import java.util.List;
import java.util.Map;

public interface ImageDao {

  List<Images> searchImagesByCode(Map<String, Object> params);

  void registerImages(Images image);

  List<Images> searchImages();



}
