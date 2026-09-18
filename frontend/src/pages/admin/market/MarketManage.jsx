import React, { useCallback, useEffect, useState } from "react";
import SearchBox from "../../../components/common/search-box/SearchBox";
import DataTable from "../../../components/common/data-table/DataTable";
import Pagination from "../../../components/common/pagination/Pagination";
import TabMenus from "../../../components/common/tab-menus/TabMenus";
import styles from "./MarketManage.module.scss";
import { useNavigate } from "react-router-dom";

// 코드가 너무 길어져서 MarketManage.constants.jsx로 뺐음
import {
  STATUS_TABS,
  DELETE_YN_OPTIONS,
  SEARCH_OPTIONS,
  getProductColumns,
} from "./MarketManage.constants";

export default function MarketManage() {
  const navigate = useNavigate();

  const columns = getProductColumns(navigate);

  const [products, setProducts] = useState([]);
  const [pager, setPager] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useState({
    page: 1,
    perPage: 10,
    status: "",
    deleteYn: "",
    search: "",
    keyword: "",
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const query = new URLSearchParams();
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key]) query.append(key, searchParams[key]);
    });

    try {
      const response = await fetch(`/api/admin/products?${query.toString()}`);

      if (!response.ok) throw new Error("데이터 로딩 실패");

      const result = await response.json();

      if (result.data) {
        setProducts(result.data.content);
        setPager(result.data.pager);
      }
    } catch (error) {
      console.error("Fetch Error", error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleTabChange = (statusValue) => {
    setSearchParams((prev) => ({
      ...prev,
      status: statusValue,
      page: 1,
    }));
  };

  const handleDeleteYnChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      deleteYn: e.target.value,
      page: 1,
    }));
  };

  const handleSearchSubmit = (searchData) => {
    setSearchParams((prev) => ({
      ...prev,
      ...searchData,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className={styles.container}>
      <h2>관리자 상품 관리</h2>

      <TabMenus
        tabs={STATUS_TABS}
        activeStatus={searchParams.status}
        onTabChange={handleTabChange}
      />

      <div className={styles.filterBar}>
        <div />

        <div className={styles.searchWrapper}>
          <SearchBox
            name="search"
            options={SEARCH_OPTIONS}
            initSelectValue=""
            initKeyword=""
            onSearch={handleSearchSubmit}
          />
        </div>

        <div className={styles.radioGroup}>
          {DELETE_YN_OPTIONS.map((opt) => (
            <label key={opt.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="deleteYn"
                value={opt.value}
                checked={searchParams.deleteYn === opt.value}
                onChange={handleDeleteYnChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={products} loading={loading} />
      <Pagination pager={pager} onChangePage={handlePageChange} />
    </div>
  );
}
