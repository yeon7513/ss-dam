package com.ss_dam.market.controller;

import com.ss_dam.market.model.MarketProduct;
import com.ss_dam.market.service.MarketProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/market_product")
public class MarketProductController {

  @Autowired
  MarketProductService productService;

  @GetMapping
  List<MarketProduct> searchMarketProducts() {
    return productService.searchProducts();
  }

  @GetMapping("/{code}")
  MarketProduct searchProductByCode(@PathVariable Long code) {
    return productService.searchProductByCode(code);
  }

}
