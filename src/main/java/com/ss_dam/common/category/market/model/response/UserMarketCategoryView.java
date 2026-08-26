package com.ss_dam.common.category.market.model.response;

import com.ss_dam.common.category.core.Category;

import java.util.List;

public class UserMarketCategoryView extends Category {
  private List<Category> depth; // 대분류용 필드

  // GETTER, SETTER
  public List<Category> getDepth() {
    return depth;
  }

  public void setDepth(List<Category> depth) {
    this.depth = depth;
  }
}
