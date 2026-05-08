package com.ss_dam.global.image.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.ss_dam.global.image.Images;

@Repository
public class ImageDaoImpl implements ImageDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Images> searchFeedImagesByFeedCode(Long feedCode) {
    return sql.selectList("image.searchFeedImagesByFeedCode", feedCode);
  }

}
