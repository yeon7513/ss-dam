import styles from "./Pagination.module.scss";

// 전체 페이지 수
// 페이지 변경 핸들러
// 활성화 된 페이지인지
function Pagination({ pager }) {

  console.log(pager);

  return (
    <div className={styles.pagination}>
      <button type="button">이전</button>
      {
        pager.list.map((item, idx) => (
          <button type="button" key={idx}>{item}</button>
        ))
      }
      <button type="button">다음</button>
    </div>
  );
}

export default Pagination;
