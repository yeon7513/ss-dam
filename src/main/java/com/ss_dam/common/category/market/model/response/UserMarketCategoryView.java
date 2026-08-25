package com.ss_dam.common.category.market.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ss_dam.common.category.core.Category;

import java.util.List;

// depth가 없을 수도 있으니 제거
// -> 하위 카테고리일 경우 없으니까..!
@JsonInclude(JsonInclude.Include.NON_NULL)
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
