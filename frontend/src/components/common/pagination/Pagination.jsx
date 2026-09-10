import styles from "./Pagination.module.scss";

// 전체 페이지 수
// 페이지 변경 핸들러
// 활성화 된 페이지인지
function Pagination({ pager, onChangePage }) {

  console.log(pager?.page);

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
