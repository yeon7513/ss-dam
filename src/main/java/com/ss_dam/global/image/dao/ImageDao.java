package com.ss_dam.global.image.dao;

import java.util.List;
import java.util.Map;
import com.ss_dam.global.image.Images;

public interface ImageDao {

  List<Images> searchImagesByCode(Map<String, Object> params);

  void registerImages(Images image);



}
