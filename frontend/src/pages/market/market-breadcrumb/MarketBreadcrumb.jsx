import React from "react";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

import styles from "./MarketBreadcrumb.module.scss";

const MarketBreadcrumb = ({ detail = {}, categories = [] }) => {
  /* 카테고리 목록 배열 변환 */
  const categoryList = Array.isArray(categories)
    ? categories
    : categories?.content || categories?.categories || categories?.data || [];

  /* 대분류 카테고리 매핑 */
  const parentCategory = categoryList.find(
    (cat) => (cat.name || cat.categoryName) === detail.mainCategoryName,
  );

  /* 소분류 카테고리 목록 추출 */
  const subCategoryList =
    parentCategory?.depth ||
    parentCategory?.children ||
    parentCategory?.subCategories ||
    [];

  /* 소분류 카테고리 매핑 */
  const subCategory = subCategoryList.find(
    (child) => (child.name || child.categoryName) === detail.subCategoryName,
  );

  /* 대분류 카테고리 코드 추출 */
  const parentCategoryCode =
    detail.mainCategoryCode ||
    parentCategory?.code ||
    parentCategory?.categoryCode ||
    parentCategory?.id;

  /* 소분류 카테고리 코드 추출 */
  const subCategoryCode =
    detail.subCategoryCode ||
    detail.categoryCode ||
    subCategory?.code ||
    subCategory?.categoryCode ||
    subCategory?.id;

  /* 대분류 경로 생성 */
  const parentCategoryPath = parentCategoryCode
    ? `/market?category=${parentCategoryCode}&categoryCode=${parentCategoryCode}`
    : "/market";

  /* 소분류 경로 생성 */
  const subCategoryPath = subCategoryCode
    ? `/market?category=${subCategoryCode}&categoryCode=${subCategoryCode}`
    : "/market";

  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      {/* 전체 카테고리 영역 */}
      <Link to="/market">전체</Link>

      {/* 대분류 카테고리 영역 */}
      {detail.mainCategoryName && (
        <>
          <IoChevronForward className={styles.separator} />
          <Link to={parentCategoryPath}>{detail.mainCategoryName}</Link>
        </>
      )}

      {/* 소분류 카테고리 영역 */}
      {detail.subCategoryName && (
        <>
          <IoChevronForward className={styles.separator} />
          <Link to={subCategoryPath}>{detail.subCategoryName}</Link>
        </>
      )}

      {/* 구분자 영역 */}
      <IoChevronForward className={styles.separator} />

      {/* 상품 제목 영역 */}
      <span className={styles.currentTitle}>{detail.title}</span>
    </nav>
  );
};

export default MarketBreadcrumb;
