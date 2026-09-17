import React, { useCallback, useEffect, useState } from "react";
import SearchBox from "./../../components/common/search-box/SearchBox";
import DataTable from "../../components/common/data-table/DataTable";
import Pagination from "./../../components/common/pagination/Pagination";
import TabMenus from "../../components/common/tab-menus/TabMenus";
import styles from "./MarketManage.module.scss";






const UserManage = () => {
  return (
    <div>
      <h2>UserManage</h2> {/* 회원 관리 */}
      <h2>안녕하세요</h2>
      <h2>리액트 공부중입니다</h2>



    </div>
  );
};

export default function UserManage() {


  const [searchParams, setSearchParams] = useState({
    page: 1,
    perPage: 10,
    status: "",
    deleteYn: "",
    search: "",
    keyword: "",
  });

 // searchParams에 들어 있는 검색 조건을 서버 요청 주소에 붙일 문자열로 만드는 코드
  const fetchMembers = useCallback(async () => {
    setLoading(true);

    const query = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      
    })


       const query = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key]) query.append(key, searchParams[key]);
    });

  })
};


//  =================================================================
//   [DataTable 공통 컴포넌트 사용 가이드]

//   부모 페이지(예: MarketManage.jsx)에서 넘겨줘야 하는 값(Props):

//   1. columns (필수, 배열) 
//      - 표의 헤더 제목과 데이터를 어떻게 띄울지 정하는 규칙입니다.
//      - header: 표 맨 위에 표시할 컬럼 이름 (예: "상품 코드")
//      - accessor: 백엔 데이터에서 가져올 키(Key) 이름 (예: "code")
//      - render: (선택) 데이터에 '원'을 붙이거나 날짜 포맷을 바꿀 때 쓰는 함수

//   2. data (필수, 배열)
//      - 백엔드 API에서 받아온 실제 목록 데이터입니다.

//   3. className (선택, 문자열)
//      - 표의 스타일(SCSS)을 추가로 넘길 때 사용합니다.
//   =================================================================