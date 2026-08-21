package com.ss_dam.market.controller;

import com.ss_dam.auth.login.Login;
import com.ss_dam.common.pager.Pager;
import com.ss_dam.market.model.response.ProductDetail;
import com.ss_dam.market.model.response.UserProductView;
import com.ss_dam.market.service.UserProductService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/market/products")
public class UserProductController {

  @Autowired
  UserProductService userProductService;

  @GetMapping
  List<UserProductView> loadProducts(Pager pager, HttpSession session) {

    // 로그인한 사용자의 Pick 여부를 받아오기 위해 세션에서 로그인 정보를 가져옴.
    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    return userProductService.loadProducts(pager, memberCode);
  }

  @GetMapping("/{prodCode}")
  ProductDetail findProductDetailByProdCode(@PathVariable Long prodCode, HttpSession session) {
    Login loginUser = (Login) session.getAttribute("loginUser");
    Long memberCode = (loginUser != null) ? loginUser.getCode() : null;

    return userProductService.findProductDetailByProdCode(prodCode, memberCode);
  }

}
