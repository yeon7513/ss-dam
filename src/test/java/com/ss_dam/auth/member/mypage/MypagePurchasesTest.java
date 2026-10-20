package com.ss_dam.auth.member.mypage;

import static org.junit.jupiter.api.Assertions.*;

import java.lang.reflect.Proxy;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

import com.ss_dam.auth.member.mypage.dao.UserMypageDao;
import com.ss_dam.auth.member.mypage.service.UserMypageServiceImpl;
import com.ss_dam.common.pager.PageQuery;

class MypagePurchasesTest {
  @Test
  void purchasesClampOutOfRangePageAndKeepSearchScopedToSessionMember() {
    List<Map<String, Object>> content = List.of(Map.of("code", 7L, "title", "텀블러"));
    UserMypageDao dao = purchaseDao(201L, content, Map.of(
        "memberCode", 42L, "keyword", "텀블러", "offset", 200, "perPage", 100));
    PageQuery query = new PageQuery();
    query.setPage(999);
    query.setPerPage(10000);
    query.setPerGroup(0);
    query.setKeyword(" 텀블러 ");

    var result = new UserMypageServiceImpl(dao, null).getMyPurchases(query, 42L);

    assertEquals(3, result.getPager().getPage());
    assertEquals(100, result.getPager().getPerPage());
    assertEquals(List.of(3), result.getPager().getList());
    assertEquals(201f, result.getPager().getTotal());
    assertEquals(content, result.getContent());
  }

  @Test
  void noPurchasesReturnsAnEmptyFirstPage() {
    UserMypageDao dao = purchaseDao(0L, List.of(), Map.of(
        "memberCode", 42L, "keyword", "", "offset", 0, "perPage", 1));
    PageQuery query = new PageQuery();
    query.setPage(-1);
    query.setPerPage(0);

    var result = new UserMypageServiceImpl(dao, null).getMyPurchases(query, 42L);

    assertTrue(result.getContent().isEmpty());
    assertEquals(1, result.getPager().getPage());
    assertEquals(0f, result.getPager().getTotal());
  }

  private UserMypageDao purchaseDao(long total, List<Map<String, Object>> content,
      Map<String, Object> expected) {
    return (UserMypageDao) Proxy.newProxyInstance(
        UserMypageDao.class.getClassLoader(), new Class<?>[] {UserMypageDao.class},
        (proxy, method, args) -> {
          Map<?, ?> params = (Map<?, ?>) args[0];
          assertEquals(expected.get("memberCode"), params.get("memberCode"));
          assertEquals(expected.get("keyword"), params.get("keyword"));
          if (method.getName().equals("countMyPurchases")) return total;
          if (method.getName().equals("searchMyPurchases")) {
            assertEquals(expected, params);
            return content;
          }
          throw new AssertionError("Unexpected DAO call: " + method.getName());
        });
  }
}
