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
import com.ss_dam.auth.member.dao.AdminMemberDao;
import com.ss_dam.common.pager.PageQuery;
import com.ss_dam.common.pager.PageResult;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.dao.AdminProductDao;
import com.ss_dam.market.model.filter.AdminProductSearchFilter;
import com.ss_dam.market.model.response.AdminMemberTradeView;
import com.ss_dam.market.model.response.AdminMemberTradesView;
import com.ss_dam.market.model.response.AdminProductDetail;
import com.ss_dam.market.model.response.AdminProductView;

@Service
public class AdminProductServiceImpl implements AdminProductService {

  @Autowired
  private AdminProductDao adminProductDao;

  //관리자 회원 상세 - 회원 존재 확인용 DAO
  @Autowired 
  private AdminMemberDao adminMemberDao;

  

   // 조회 필터로 허용할 값
private static final Set<String> ALLOWED_STATUSES = Set.of(
        "ACTIVE", "PRIVATE", "BLINDED", "REPORTED", "DELETED");

// 관리자 상품 목록 조회
@Override
public PageResult<AdminProductView> loadProducts(AdminProductSearchFilter filter) { 


    List<AdminProductView> products =
            adminProductDao.loadProducts(filter);
    
    int total = adminProductDao.countProducts(filter);   

    return PageResult.of(products, filter, (float) total);
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

      //관리자 회원 상세 - 회원 거래 통계와 페이지 목록
        @Override
        @Transactional(readOnly = true)
        public AdminMemberTradesView loadMemberTrades(
                Long memberCode, PageQuery pageQuery) {

        // 1. 페이지 입력값 확인
        if (pageQuery.getPage() < 1
                || pageQuery.getPerPage() < 1
                || pageQuery.getPerGroup() < 1) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "페이지 관련 값은 1 이상이어야 합니다.");
        }

        // 2. 회원 존재 여부 확인
        if (adminMemberDao.loadMember(memberCode) == null) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "존재하지 않는 회원입니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberCode", memberCode);

        // 3. 전체 거래 / 구매 / 판매 통계
        AdminMemberTradesView result =
                adminProductDao.loadMemberTradeSummary(params);

        // 4. 공통 페이지 계산 기능 재사용
        Pager pager = new Pager(
                pageQuery, result.getTotalTradeCount());

        params.put("offset", pageQuery.getOffset());
        params.put("perPage", pager.getPerPage());

        // 5. 현재 페이지의 거래 목록
        // 상품 상세 정보는 XML association에서 채움
        List<AdminMemberTradeView> trades =
                adminProductDao.loadMemberTrades(params);

        // 6. 통계 + 목록 + 페이지 정보 반환
        result.setTrades(PageResult.of(trades, pager));

        return result;
        }
}




