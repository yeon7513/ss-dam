import React from 'react';
import { IoClose } from "react-icons/io5";
import styles from "./ActiveFilters.module.scss";

function ActiveFilters({ activeFilters, onDeleteFilter }) {
  return (
    <div className={styles.activeFilters}>
      <div className={styles.title}>
        선택 필터
        <span className={styles.count}>{activeFilters.length}</span>
      </div>
      <div className={styles.filterItem}>
        {activeFilters.length > 0 ? (
          activeFilters.map((filter) => (
            <span key={filter.key} className={styles.badge} onClick={() => onDeleteFilter(filter.key)}>
              {filter.label}
              <button
                type="button"
                onClick={() => onDeleteFilter(filter.key)}
                className={styles.removeButton}
              >
                <IoClose />
              </button>
            </span>
          ))
        ) : (
          <span className={styles.noFilter}>선택된 필터가 없습니다.</span>
        )}
      </div>
    </div>
  );
}

export default ActiveFilters;
