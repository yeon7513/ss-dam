import React from 'react';
import { Link } from "react-router-dom";
import styles from "./MarketSideNav.module.scss";

// 다시쓰담 전용 사이드 메뉴
// 이 사이드메뉴는 목록, 상세 페이지에서 사용함.
// 목록에서 카테고리 메뉴 클릭 -> 필터링되어 재렌더링
// 상세 페이지에서 카테고리 메뉴 클릭 -> 목록으로 이동 후 필터링되어 재렌더링
function MarketSideNav({ categories, onSearch }) {

  const handleClickCategory = (e, categoryCode) => {
    // 이벤트 버블링 해제
    e.stopPropagation();

    if (categoryCode === null) {
      // 쿼리스트링에서 제외, 즉 전체 조회로!
      onSearch({
        categoryCode: null,
      })
    } else {
      onSearch({
        categoryCode: categoryCode,
      });
    }
  };


  return (
    <div className={styles.sideNav}>
      {/* 로그인 사용자 전용 */}
      <div>
        <Link to="/market/register">물품 등록</Link>
      </div>

      {/* 카테고리 */}
      <ul className={styles.mainMenu}>
        <li>
          <button type="button" onClick={e => handleClickCategory(e, null)}>전체</button>
        </li>
        {categories?.map((category) => (
          <li key={category.code}>
            <button
              type="button"
              onClick={(e) => handleClickCategory(e, category.code)}
            >
              {category.name}
            </button>
            <ul className={styles.subMenu}>
              {category.depth.map(sub => (
                <li key={sub.code}>
                  <button
                    type="button"
                    onClick={(e) => handleClickCategory(e, sub.code)}
                  >
                    {sub.name}
                  </button>
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
