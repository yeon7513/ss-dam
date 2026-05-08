package com.ss_dam.market.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ss_dam.market.MarketProduct;

@RestController
@RequestMapping("/market_product")
public class MarketProductController {

  @GetMapping
  List<MarketProduct> searchMarketProducts() {
    return null;
  }

}
