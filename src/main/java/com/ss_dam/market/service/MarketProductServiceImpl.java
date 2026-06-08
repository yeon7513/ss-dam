package com.ss_dam.market.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ss_dam.auth.member.MemberProfile;
import com.ss_dam.auth.member.service.MemberService;
import com.ss_dam.global.image.Images;
import com.ss_dam.global.image.service.ImageService;
import com.ss_dam.global.likes.service.MarketProductPickService;
import com.ss_dam.market.MarketProduct;
import com.ss_dam.market.dao.MarketProductDao;

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
