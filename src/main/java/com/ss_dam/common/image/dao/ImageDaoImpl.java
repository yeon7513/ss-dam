package com.ss_dam.common.image.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.ss_dam.common.image.model.Images;

@Repository
public class ImageDaoImpl implements ImageDao {

  private SqlSession sql;

  public ImageDaoImpl (SqlSession sql) {
    this.sql = sql;
  }

  @Override
  public List<Images> findImagesByCode(Map<String, Object> params) {
    return sql.selectList("image.findImagesByCode", params);
  }

  @Override
  public void registerImages(Images image) {
    sql.insert("image.registerImages", image);
  }

  @Override
  public List<Images> loadImages() {
    return sql.selectList("image.loadImages");
  }

  @Override
  public void deleteImagesByFilename(Map<String, Object> params) {
    sql.delete("image.deleteImagesByFilename", params);
  }

  @Override
  public void updateImageOrderSeq(Map<String, Object> params) {
    sql.update("image.updateImageOrderSeq", params);
  }


}
