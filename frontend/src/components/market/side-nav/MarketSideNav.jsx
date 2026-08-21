import React from 'react';
import { Link } from "react-router-dom";
import { useLoadData } from "../../../hooks/useLoadData.js";

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

  return (
    <ul>
      <li>
        <Link to="/market/register">물품 등록</Link>
      </li>
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
  );
}

export default MarketSideNav;
