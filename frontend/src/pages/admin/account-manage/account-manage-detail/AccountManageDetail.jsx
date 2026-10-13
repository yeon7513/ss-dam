import React from 'react';
import { useLoadData } from "../../../../hooks/useLoadData.js";
import styles from "./AccountManageDetail.module.scss";
import Card from "../../../../components/common/card/Card.jsx";
import cn from "classnames";
import { BiError } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";

function AccountManageDetail({ code }) {
  // props로 받아오는 code의 값이 유효할 때만 fetch로 데이터를 불러옴
  const { data: detail } = useLoadData(code ? `/api/admin/account/${code}` : null);

  if (code === null) {
    return (
      <Card className={cn(styles.detail, styles.notice)}>
        <TbHandClick className={styles.icon} />
        <p>관리할 계정을 선택해주세요.</p>
      </Card>
    );
  }

  if (!detail) {
    return (
      <Card className={cn(styles.detail, styles.notice)}>
        <BiError className={styles.icon} />
        <p>계정 정보를 조회할 수 없습니다.</p>
      </Card>
    );
  }

  console.log(detail);

  return (
    <Card className={styles.detail}>
      
    </Card>
  );
}

export default AccountManageDetail;
