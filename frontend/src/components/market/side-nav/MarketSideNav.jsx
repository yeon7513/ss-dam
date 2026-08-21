import React from 'react';
import { Link } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";
import styles from "./MarketSideNav.module.scss";

// 다시쓰담 전용 사이드 메뉴
function MarketSideNav() {
  const { data, loading, error } = useLoadData("/api/categories/market/active");

  const categories = data || [];

  console.log(categories);

  if (loading) {
    return <div>카테고리를 불러오는 중입니다.</div>;
  }
  if (error) {
    return <div>카테고리를 불러오는데 실패했습니다. {error}</div>;
  }

  // 이 사이드메뉴는 목록, 상세 페이지에서 사용함.
  // 목록에서 카테고리 메뉴 클릭 -> 필터링되어 재렌더링
  // 상세 페이지에서 카테고리 메뉴 클릭 -> 목록으로 이동 후 필터링되어 재렌더링

  return (
    <div className={styles.sideNav}>
      {/* 로그인 사용자 전용 */}
      <div>
        <Link to="/market/register">물품 등록</Link>
      </div>

      {/* 카테고리 */}
      <ul>
        {categories.map((category) => (
          <li key={category.code}>
            <button type="button">{category.name}</button>
            <ul>
              {category.depth.map(sub => (
                <li key={sub.code}>
                  <button type="button">{sub.name}</button>
                </li>
              ))}
            </ul>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default MarketSideNav;
