package com.ss_dam.common.category.challenge.model.response;

import com.ss_dam.common.category.challenge.enums.ProgressStatus;
import com.ss_dam.common.category.core.Category;


public class UserChallengeCategoryView extends Category {
  private ProgressStatus progressStatus;

  // GETTER, SETTER
  public ProgressStatus getProgressStatus() {
    return progressStatus;
  }

  public void setProgressStatus(ProgressStatus progressStatus) {
    this.progressStatus = progressStatus;
  }
}
