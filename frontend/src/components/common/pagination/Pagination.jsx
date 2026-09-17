import styles from "./Pagination.module.scss";

// 페이지네이션 컴포넌트
// pager: 페이지네이션 정보
// onChangePage: 페이지 변경 핸들러
function Pagination({ pager, onChangePage }) {

  return (
    <div className={styles.pagination}>
      <button type="button">이전</button>
      <ul className={styles.pages}>
        {
          pager?.list.map((item, idx) => (
            <li key={idx} className={styles.pageNumber}>
              <button
                type="button"
                className={item === pager?.page ? styles.active : ''}
                onClick={() => onChangePage(item)}
              >{item}</button>
            </li>
          ))
        }
      </ul>
      <button type="button">다음</button>
    </div>
  );
}

export default Pagination;
