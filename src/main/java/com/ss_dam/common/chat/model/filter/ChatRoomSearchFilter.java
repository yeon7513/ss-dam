package com.ss_dam.common.chat.model.filter;

import com.ss_dam.common.pager.PageQuery;

public class ChatRoomSearchFilter extends PageQuery {
  // 임시로...
  private boolean isRead;


  public boolean isRead() {
    return isRead;
  }

  public void setRead(boolean read) {
    isRead = read;
  }
}
