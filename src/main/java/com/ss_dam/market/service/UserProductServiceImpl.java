package com.ss_dam.market.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.auth.login.enums.AuthRole;
import com.ss_dam.auth.login.model.response.AuthProfile;
import com.ss_dam.common.image.service.ImageService;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.market.dao.UserProductDao;
import com.ss_dam.market.model.filter.UserProductSearchFilter;
import com.ss_dam.market.model.request.ProductCreate;
import com.ss_dam.market.model.request.ProductUpdate;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.ProductEditView;
import com.ss_dam.market.model.response.UserProductView;
import com.ss_dam.point.service.UserPointService;

@Service
public class UserProductServiceImpl implements UserProductService {

  private final UserProductDao userProductDao;
  private final ImageService imageService;
  private final UserPointService userPointService;

  public UserProductServiceImpl(UserProductDao userProductDao, ImageService imageService, UserPointService userPointService) {
    this.userProductDao = userProductDao;
    this.imageService = imageService;
    this.userPointService = userPointService;
  }

  // 목록 조회
  @Override
  public PageResult<UserProductView> loadProducts(UserProductSearchFilter filter, Long memberCode) {
    Map<String, Object> params = new HashMap<>();

    params.put("memCode", memberCode);

    // 페이지네이션
    params.put("offset", filter.getOffset());
    params.put("perPage", filter.getPerPage());

    // 검색 필터
    params.put("categoryCode", filter.getCategoryCode());
    params.put("sortTarget", filter.getSortTarget());
    params.put("dealStatus", filter.getDealStatus());
    params.put("keyword", filter.getKeyword());

    List<UserProductView> products = userProductDao.loadProducts(params);
    float total = userProductDao.loadProductsTotalCount(filter);

    return PageResult.of(products, filter, total);
  }


  // 상세 조회
  @Transactional
  @Override
  public ProductDetail findProductDetailByProdCode(Long prodCode, AuthProfile loginUser) {

    boolean isMember = loginUser != null && loginUser.getRole() == AuthRole.ROLE_MEMBER;
    Long memberCode = (isMember) ? loginUser.getCode() : null;

    Map<String, Object> params = new HashMap<>();
    params.put("prodCode", prodCode);
    params.put("memCode", memberCode);

    ProductDetail productDetail = userProductDao.findProductDetailByProdCode(params);

    if (productDetail == null) {
      return null;
    }

    boolean isOther = !Objects.equals(productDetail.getMemberProfile().getCode(), memberCode);

    if (isMember && isOther) {
      userProductDao.registerProductPostHitcountLog(params);
    }

    return productDetail;
  }


  // 수정할 거래글 조회 -> 사용자가 작성한 거래글만 조회
  @Override
  public ProductEditView findProductDetailForEdit(Long prodCode, Long memberCode) {
    Map<String, Object> params = new HashMap<>();
    params.put("prodCode", prodCode);
    params.put("memCode", memberCode);

    return userProductDao.findProductDetailForEdit(params);
  }


  // 거래글 수정
  @Transactional
  @Override
  public void updateProductPost(ProductUpdate productUpdate, AuthProfile loginUser) {

    productUpdate.setUpdatedBy(loginUser.getId());

    userProductDao.updateProductPost(productUpdate);

    Long prodCode = productUpdate.getCode();
    List<MultipartFile> images = productUpdate.getImages();
    List<Integer> newImageOrders = productUpdate.getNewImageOrders();

    List<String> imagePaths = productUpdate.getImagePaths();
    List<Integer> oldImageOrders = productUpdate.getOldImageOrders();


    // 이미지 수정
    imageService.updateImages(prodCode, "market", images, newImageOrders, imagePaths,
        oldImageOrders);

  }

  // 거래글 삭제
  @Override
  public void deleteProductPost(Long prodCode, AuthProfile loginUser) {
    Map<String, Object> params = new HashMap<>();
    params.put("prodCode", prodCode);
    params.put("updatedBy", loginUser.getId());

    userProductDao.deleteProductPost(params);
  }

  // 게시글 등록
  @Transactional
  @Override
  public Long registerProductPost(ProductCreate productCreate, AuthProfile loginUser) {
    productCreate.setMemCode(loginUser.getCode());
    productCreate.setCreatedBy(loginUser.getId());

    userProductDao.registerProductPost(productCreate);
    Long newProductPostCode = productCreate.getCode();

    // 업로드할 이미지가 존재하는 경우에만 파일 업로드 수행
    List<MultipartFile> images = productCreate.getImages();
    if (images != null && !images.isEmpty()) {
      imageService.uploadImages(images, "market", newProductPostCode);
    }

    return newProductPostCode;
  }
  
  @Transactional
  @Override
  public void purchaseProduct(Long prodCode, AuthProfile loginUser) {
	  Long buyerCode = loginUser.getCode();
	  
	  Map<String, Object> params = new HashMap<>();
	  
	  params.put("prodCode", prodCode);
	  params.put("memCode", buyerCode);
	  
	  ProductDetail product = userProductDao.findProductDetailByProdCode(params);
	  
//	  System.out.println("=== dealStatus 값: " + product.getDealStatus() + 
//              " | 타입: " + (product.getDealStatus() != null ? product.getDealStatus().getClass().getName() : "null") + " ===");
	  
	  if(product == null) {
		  throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 거래글입니다");
	  }
	  
	  if(Objects.equals(product.getMemberProfile().getCode(), buyerCode)) {
		  throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "본인이 등록한 상품은 구매할 수 없습니다");
	  }
	  
	  if(!"ON_SALE".equals(String.valueOf(product.getDealStatus()))) {
		  throw new ResponseStatusException(HttpStatus.CONFLICT, "거래 가능한 상태가 아닙니다");		  
	  }
	  
	  userPointService.deductPoint(buyerCode, product.getPrice(), "MARKET_ESCROW", prodCode);
	  
	  Map<String, Object> updateParams = new HashMap<>();
	  
	  updateParams.put("prodCode", prodCode);
	  updateParams.put("buyerCode", buyerCode);
	  updateParams.put("dealStatus", "IN_PROGRESS");
	  
	  userProductDao.updateProductDealStatus(updateParams);
  }
  
  @Transactional
  @Override
  public void completeProductTrade(Long prodCode, AuthProfile loginUser) {
	  
	  Long sellerCode = loginUser.getCode();
	  
	  Map<String, Object> params = new HashMap<>();
	  
	  params.put("prodCode", prodCode);
	  params.put("memCode", sellerCode);
	  
	  ProductDetail product = userProductDao.findProductDetailByProdCode(params);
	  
	  if(product == null) {
		  throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 거래글입니다");		  
	  }
	  
	  if(!Objects.equals(product.getMemberProfile().getCode(), sellerCode )) {
		  throw new ResponseStatusException(HttpStatus.FORBIDDEN, "판매자만 판매 완료 처리를 할 수 있습니다");
	  }
	  
	  if(!"IN_PROGRESS".equals(String.valueOf(product.getDealStatus()))) {
		  throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "거래 진행 중인 상품만 완료할 수 있습니다");
	  }
	  
	  userPointService.rewardPoint(sellerCode, product.getPrice(), "MARKET_SALES", prodCode);
	  
	  Map<String, Object> updateParams = new HashMap<>();
	  
	  updateParams.put("prodCode", prodCode);
	  updateParams.put("dealStatus", "SOLD");
	  updateParams.put("buyerCode", product.getBuyerCode());
	  
	  userProductDao.updateProductDealStatus(updateParams);
  }
  
  @Transactional
  @Override
  public void cancelProductTrade(Long prodCode, AuthProfile loginUser) {
	  Long userCode = loginUser.getCode();
	  
	  Map<String, Object> params = new HashMap<>();
	  params.put("prodCode", prodCode);
	  params.put("memCode", userCode);
	  
	  ProductDetail product = userProductDao.findProductDetailByProdCode(params);
	  
	  if(product == null) {
		  throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 거래글입니다");
	  }
	  
	  if(!"IN_PROGRESS".equals(String.valueOf(product.getDealStatus()))) {
		  throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "취소할 수 없는 거래 상태입니다");
	  }
	  
	  userPointService.rewardPoint(product.getBuyerCode(), product.getPrice(), "MARKET_REFUND", prodCode);
	  
	  Map<String, Object> updateParams = new HashMap<>();
	  
	  updateParams.put("prodCode", prodCode);
	  updateParams.put("buyerCode", null);
	  updateParams.put("dealStatus", "ON_SALE");
	  
	  userProductDao.updateProductDealStatus(updateParams);
  }
}
