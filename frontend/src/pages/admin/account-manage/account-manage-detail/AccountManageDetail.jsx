import React from 'react';
import { useParams } from "react-router-dom";
import { useLoadData } from "../../../../hooks/useLoadData.js";

function AccountManageDetail() {
  const { code } = useParams();

  const { data: detail } = useLoadData(`/api/admin/account/${code}`);

  console.log(detail);

  return (
    <div>AccountManageDetail</div>
  );
}

export default AccountManageDetail;
