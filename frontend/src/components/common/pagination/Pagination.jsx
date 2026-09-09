// 전체 페이지 수
// 페이지 변경 핸들러
// 활성화 된 페이지인지

function Pagination({ total, pages, isActive, onChangePage }) {


  return <div>
    <button type="button">이전</button>
    {pages.map(page => (
      <span>{page}</span>
    ))}
    <button type="button">다음</button>
  </div>;
}

export default Pagination;
