package com.ss_dam.global.image.dao;

import java.util.List;
import com.ss_dam.global.image.Images;

public interface ImageDao {

  List<Images> searchFeedImagesByFeedCode(Long feedCode);

}
