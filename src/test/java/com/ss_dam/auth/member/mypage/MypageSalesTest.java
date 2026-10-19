package com.ss_dam.auth.member.mypage;

import static org.junit.jupiter.api.Assertions.*;

import java.io.InputStream;
import java.lang.reflect.Proxy;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.session.Configuration;
import org.junit.jupiter.api.Test;

import com.ss_dam.auth.member.mypage.dao.UserMypageDao;
import com.ss_dam.auth.member.mypage.model.response.MypageChallengeView;
import com.ss_dam.auth.member.mypage.service.UserMypageServiceImpl;
import com.ss_dam.common.pager.PageQuery;

class MypageSalesTest {
  @Test
  void salesQueriesUseSessionMemberAndBoundSearchForListAndCount() {
    AtomicInteger calls = new AtomicInteger();
    UserMypageDao dao = (UserMypageDao) Proxy.newProxyInstance(
        UserMypageDao.class.getClassLoader(), new Class<?>[] { UserMypageDao.class },
        (proxy, method, args) -> {
      Map<?, ?> params = (Map<?, ?>) args[0];
      assertEquals(42L, params.get("memberCode"));
      assertEquals("텀블러", params.get("keyword"));
      assertEquals(0, params.get("offset"));
      assertEquals(100, params.get("perPage"));
      calls.incrementAndGet();
      return method.getName().equals("searchMySales") ? List.of() : 0f;
    });
    PageQuery query = new PageQuery();
    query.setPage(-1);
    query.setPerPage(10000);
    query.setKeyword("텀블러");
    var service = new UserMypageServiceImpl(dao, null);
    assertTrue(service.getMySales(query, 42L).getContent().isEmpty());
    assertEquals(2, calls.get());
  }

  @Test
  void mypageMapperParsesAndKeepsSalesScopedToOwner() throws Exception {
    Configuration configuration = new Configuration();
    configuration.getTypeAliasRegistry().registerAlias("MypageChallengeView", MypageChallengeView.class);
    String resource = "mapper/auth/mypage.xml";
    try (InputStream input = getClass().getClassLoader().getResourceAsStream(resource)) {
      assertNotNull(input);
      new XMLMapperBuilder(input, configuration, resource, configuration.getSqlFragments()).parse();
    }
    Map<String, Object> params = Map.of("memberCode", 42L, "keyword", "텀블러", "offset", 0, "perPage", 10);
    for (String id : List.of("searchMySales", "countMySales")) {
      var bound = configuration.getMappedStatement("mypage." + id).getBoundSql(params);
      assertTrue(bound.getSql().contains("p.mem_code = ?"));
      assertTrue(bound.getSql().contains("p.delete_yn = 0"));
      assertFalse(bound.getSql().contains("텀블러"));
      assertTrue(bound.getParameterMappings().stream().anyMatch(p -> p.getProperty().equals("keyword")));
    }
    for (String id : List.of("searchMySalesSummary", "searchLikedFeedSummary")) {
      assertNotNull(configuration.getMappedStatement("mypage." + id).getBoundSql(42L));
    }
  }
}
