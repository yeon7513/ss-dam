import { useSearchParams } from "react-router-dom";
import { buildQueryString } from "../utils/buildQueryString.js";

export const useSearchQuery = (defaultParams = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // useSearchParams로 만들어진 쿼리 객체를 복원
  const searchFilter = Object.fromEntries(
    Object.entries(defaultParams).map(([key, defaultValue]) => {
      const val = searchParams.get(key);
      // URL에 저장된 쿼리스트링 값이 있으면 그 값을,
      // 없으면 기본값을 사용해 객체로 반환
      // 즉, 쿼리스트링 -> 객체로 만듦.
      return [key, val !== null ? val : defaultValue];
    }),
  );

  // 페이지네이션 번호 지정
  searchFilter.page = Number(searchParams.get('page')) || defaultParams.page || 1;
  searchFilter.perPage = Number(searchParams.get('perPage')) || defaultParams.perPage || 10;

  // 검색 조건 변경 시 실행할 핸들러
  // -> 페이지 번호를 1로 변경 후 쿼리스트링 재조립
  const handleSearch = (newParams) => {
    const nextQuery = buildQueryString({
      ...searchFilter,
      ...newParams,
      page: 1,
    });

    setSearchParams(nextQuery);
  }

  // 페이지 변경 핸들러
  const handleChangePages = (newPage) => {
    // 기존 검색 조건 유지하면서 page 번호만 변경
    const nextQuery = buildQueryString({
      ...searchFilter,
      page: newPage,
    });
    setSearchParams(nextQuery); // URL 변경 -> 자동으로 API 재요청 & UI 업데이트
  };

  // 완성된 쿼리스트링 확인용 console.log
  // console.log(searchParams.toString());

  return {
    searchFilter, // 자식 컴포넌트에 내려줄 현재 조건 객체
    queryString: buildQueryString(searchFilter), // API 호출용 쿼리스트링
    handleChangePages, // 페이지 변경 핸들러 (Pagination.jsx)
    handleSearch, // 검색 변경 핸들러 (SearchBox.jsx)
  };
};
