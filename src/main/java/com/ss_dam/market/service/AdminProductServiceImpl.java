package com.ss_dam.market.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ss_dam.admin.log.response.AdminActivity;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.dao.AdminProductDao;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

@Service
public class AdminProductServiceImpl implements AdminProductService {

  @Autowired
  private AdminProductDao adminProductDao;

    // 조회 필터로 허용할 값
    private static final Set<String> ALLOWED_STATUSES = Set.of(
            "ACTIVE", "PRIVATE", "BLINDED", "REPORTED", "DELETED");

    private static final Set<String> ALLOWED_DEAL_STATUSES = Set.of(
            "ON_SALE", "IN_PROGRESS", "SOLD");
  
   //관리자 - 상품 목록 조회
   @Override
    public List<AdminProductView> loadProducts(
            Pager pager, String status, String dealStatus) {

        validateFilter(status, ALLOWED_STATUSES, "상품 상태");
        validateFilter(dealStatus, ALLOWED_DEAL_STATUSES, "거래 상태");

        if (pager.getPerPage() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "페이지당 조회 개수는 1 이상이어야 합니다.");
        }

        Map<String, Object> params = new HashMap<>();

     // 검색 조건
        params.put("searchCode", pager.getSearchCode());
        params.put("keyword", pager.getKeyword());

        // 상태 필터
        params.put("status", status);
        params.put("dealStatus", dealStatus);

        // 검색 조건에 해당하는 전체 상품 수
        int total = adminProductDao.countProducts(params);
        pager.setTotal(total);

        // 페이지네이션
        params.put("offset", pager.getOffset());
        params.put("perPage", pager.getPerPage());

        return adminProductDao.loadProducts(params);
    }

    // 관리자 상품 상세 조회
    @Override
    public AdminProductDetail loadProduct(Long prodCode) {
        return requireProduct(prodCode);
    }

    // 상품 논리 삭제 + 처리 이력 저장
    @Transactional
    @Override
    public void deleteProduct(
            Long prodCode, String reason, Long admCode) {

        requireProduct(prodCode);

        int updatedCount = adminProductDao.deleteProduct(prodCode);

        requireUpdated(
                updatedCount,
                "이미 삭제되었거나 삭제할 수 없는 상품입니다.");

        saveActivityLog(prodCode, reason, admCode, "DELETE");
    }

    // 삭제된 상품 복구 + 처리 이력 저장
    @Transactional
    @Override
    public void restoreProduct(
            Long prodCode, String reason, Long admCode) {

        requireProduct(prodCode);

        int updatedCount = adminProductDao.restoreProduct(prodCode);

        requireUpdated(
                updatedCount,
                "삭제된 상품만 복구할 수 있습니다.");

        saveActivityLog(prodCode, reason, admCode, "RESTORE");
    }

    // 상품 관리 처리 이력 조회
    @Override
    public List<AdminActivity> loadProductLogs(Long prodCode) {

        requireProduct(prodCode);

        return adminProductDao.loadProductLogs(prodCode);
    }

    // 필터 값 검증: null이면 해당 필터 생략
    private void validateFilter(
            String value,
            Set<String> allowedValues,
            String fieldName) {

        if (value != null && !allowedValues.contains(value)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "지원하지 않는 " + fieldName + "입니다.");
        }
    }

    // 상품 조회 및 존재 여부 확인
    private AdminProductDetail requireProduct(Long prodCode) {

        AdminProductDetail product =
                adminProductDao.loadProduct(prodCode);

        if (product == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "상품이 존재하지 않습니다.");
        }

        return product;
    }

    // 실제 변경 건수 확인
    private void requireUpdated(int updatedCount, String message) {

        if (updatedCount == 0) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, message);
        }

        if (updatedCount != 1) {
            throw new IllegalStateException(
                    "상품 변경 건수가 올바르지 않습니다.");
        }
    }

    // 관리자 처리 이력 저장
    private void saveActivityLog(
            Long prodCode,
            String reason,
            Long admCode,
            String processType) {

        Map<String, Object> params = new HashMap<>();
        params.put("prodCode", prodCode);
        params.put("admCode", admCode);
        params.put("reason", reason);
        params.put("processType", processType);

        int insertedCount = adminProductDao.insertActivityLog(params);

        if (insertedCount != 1) {
            throw new IllegalStateException(
                    "상품 관리 이력 저장에 실패했습니다.");
        }
    }
}




