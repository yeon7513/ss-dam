package com.ss_dam.market.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductEditView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.dao.UserProductDao;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.UserProductView;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserProductServiceImpl implements UserProductService {

  @Autowired
  UserProductDao userProductDao;

  @Autowired
  ImageService imageService;


  // 목록 조회
  @Override
  public List<UserProductView> loadProducts(Pager pager, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("memberCode", memberCode);
    params.put("offset", pager.getOffset());
    params.put("perPage", pager.getPerPage());

    return userProductDao.loadProducts(params);
  }


  // 상세 조회
  @Override
  public ProductDetail findProductDetailByProdCode(Long prodCode, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("prodCode", prodCode);
    params.put("memberCode", memberCode);

    return userProductDao.findProductDetailByProdCode(params);
  }


  // 수정할 거래글 조회 -> 사용자가 작성한 거래글만 조회
  @Override
  public ProductEditView findProductDetailForEdit(Long prodCode, Long memberCode) {
    Map<String, Object> params = new HashMap<>();
    params.put("prodCode", prodCode);
    params.put("memberCode", memberCode);

    return userProductDao.findProductDetailForEdit(params);
  }


  // 거래글 수정
  @Transactional
  @Override
  public void updateProductPost(ProductUpdate productUpdate) {

    userProductDao.updateProductPost(productUpdate);

    Long prodCode = productUpdate.getCode();
    List<MultipartFile> images = productUpdate.getImages();
    List<Integer> newImageOrders = productUpdate.getNewImageOrders();

    List<String> imagePaths = productUpdate.getImagePaths();
    List<Integer> oldImageOrders = productUpdate.getOldImageOrders();


    // 이미지 수정
    imageService.updateImages(prodCode, "market", images, newImageOrders, imagePaths, oldImageOrders);

  }
}
