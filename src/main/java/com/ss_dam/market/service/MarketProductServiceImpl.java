package com.ss_dam.market.service;

import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.common.image.model.Images;
import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.common.likes.service.MarketProductPickService;
import com.ss_dam.market.dao.MarketProductDao;
import com.ss_dam.market.model.MarketProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketProductServiceImpl implements MarketProductService {

  @Autowired
  MemberService memberService;
  @Autowired
  ImageService imageService;
  @Autowired
  MarketProductPickService pickService;

  @Autowired
  MarketProductDao productDao;

  @Override
  public List<MarketProduct> searchProducts() {
    return productDao.searchProducts();
  }

  @Override
  public MarketProduct searchProductByCode(Long code) {
    MarketProduct product = productDao.searchProductByCode(code);

    if (product == null) {
      return null;
    }

    // 작성자 프로필 정보
    MemberProfile memberProfile = memberService.searchProfileByMemberCode(product.getMemCode());
    product.setMemberProfile(memberProfile);

    // 이미지 리스트
    List<Images> images = imageService.searchImagesByCode("market", product.getCode());
    product.setImages(images);

    // Pick 개수
    int countProductPick = pickService.countProductPick(code);
    product.setCountPick(countProductPick);

    return product;
  }

}
