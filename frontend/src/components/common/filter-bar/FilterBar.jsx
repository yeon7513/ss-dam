import styles from './FilterBar.module.scss';

// 이 컴포넌트는 내부 필터를 배치하고 검색 제출을 전달하는 역할만 합니다
// API호출은 각 jsx에서 하고 필요한것들 넣어서 기존 검색 영역 교체

//FilterBar를 <form> 대신 <div>로 만들면 내부에 SearchBox를 넣을 수 있다
//FilterBar가 <form>이면 안에는 기존 <form> 구조의 SearchBox 대신,
//TextInput과 검색 버튼을 넣어야 함


export default function FilterBar({ children, className = '' }) {
  return (
    <div className={`${styles.filterBar} ${className}`}>
      {children}
    </div>
  );
}

// 활용 예시
// <FilterBar>
//   {/* 가입일 시작·종료: TextInput */}
//   {/* 활동 상태·지역·등급: SelectBox */}

//   <SearchBox
//     name="search"
//     initSelectValue=""
//     initKeyword=""
//     onSearch={handleSearchSubmit}
//   />
// </FilterBar>