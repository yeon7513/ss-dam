package com.ss_dam.global.image.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.global.image.Images;

@Repository
public class ImageDaoImpl implements ImageDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Images> searchImagesByCode(Map<String, Object> params) {
    return sql.selectList("image.searchImagesByCode", params);
  }

  @Override
  public void registerImages(Images image) {
    sql.insert("image.registerImages", image);
  }

  @Override
  public List<Images> searchImages() {
    return sql.selectList("image.searchImages");
  }


}
