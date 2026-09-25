import style from "./UserManage.module.scss"

// status 탭
// NORMAL, SUSPENDED, SLEEP, WITHDRAW
export const STATUS_TABS = [
    { value : "", label: "전체 상태" },
    { value : "NORMAL", label: "일반" },
    { value : "SUSPENDED", label: "정지" },
    { value : "SLEEP", label: "휴면" },
    { value : "WITHDRAWN", label: "탈퇴" },
];

// 활동 여부 라디오 버튼
export const DELETE_YN_OPTIONS = [
    { value: "", label: "전체" },
    { value: "0", label: "활동" },
    { value: "1", label: "비활동" },
];

// SearchBox.jsx 컴포넌트
export const SEARCH_OPTIONS = [
    { code: "", name: "전체 검색" },
    { code: "code", name: "회원코드" },
    { code: "id", name: "아이디" },
    { code: "name", name: "이름" },
    { code: "phone", name: "연락처" },
];

//DataTable 컴포넌트
export const getMemberColumns = (navigate) => [
    { header: "회원 코드", accessor: "code" },
    { header: "아이디", accessor: "id" },
    { header: "이름", accessor: "name" },
    { header: "지역", accessor: "address" },
    { header: "등급", accessor: "rating" },
    { header: "랭킹", accessor: "ranking" },
    {
      header: '상태',
      render: (item) => {
      // 현재 회원 목록 API의 deleteYn은 Boolean
      if (item.deleteYn === true) return '탈퇴';

      const labels = {
          ACTIVE: '일반',
          SUSPENDED: '정지',
          SLEEP: '휴면',
      };

      return labels[item.status] ?? item.status ?? '-';
      },
    },
    {
      header: '가입일',
      render: (item) =>
        item.createdAt
          ? new Date(item.createdAt).toLocaleDateString('ko-KR')
          : '-',
    },
];


