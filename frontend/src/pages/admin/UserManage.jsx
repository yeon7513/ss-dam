// //status 탭
// //auth/member/enums/MemberStatus
// //조회 요청: /api/admin/members?status=NORMAL
// const STAUTS_TABS = [
//   { value: '', label: '전체 상태' },
//   { value: 'NORMAL', label: '일반' },
//   { value: 'SUSPENDED', label: '정지' },
//   { value: 'WITHDRAW', label: '탈퇴' },
// ];
// //DB의 상태 값
// //NORMAL → DB STATUS = 'ACTIVE', DELETE_YN = 0
// //SUSPENDED → DB STATUS = 'SUSPENDED', DELETE_YN = 0
// //WITHDRAWN → DB DELETE_YN = 1
// //따라서 목록에 회원 상태를 표시할 때도 user.deleteYn이 true이면 먼저 탈퇴로 표시하고,
// //나머지는 user.status로 구분

// //필터(활동상태랑 지역 아직 X)
// const INITIAL_FILTERS = {
//   joinedFrom: '',
//   joinedTo: '',
//   rating: '',
//   keyword: '',
// };

// //getStatusLabel은 회원 데이터(user)를 받아서 화면에 표시할 상태 이름을 반환하는 함수
// function getStatusLabel(user) {
//   if (user.deleteYn) return '탈퇴';

//   if (user.status == 'ACTIVE') return '일반';
//   if (user.status == 'SUSPENDED') return '정지';

//   return '알 수 없음';
// }

// //formatDate는 날짜 문자열을 화면에 보여주기 좋게 바꾸는 함수
// function formatDate(value) {
//   //value ? ... : '-' — 값이 있는지 확인
//   //삼항 연산자. 값이 있으면 날짜를 가공하고,
//   //null, undefined, ''처럼 값이 없으면 '-'를 반환
//   //'2026-09-21T14:30:00'.slice(0, 10) --> '2026-09-21'
//   return value ? value.slice(0,10).replaceAll('-', '.') : '-';
// }

// //MemberCard는 회원 한 명의 정보를 카드 모양으로 보여주는 리액트 컴포넌트
// function MemberCard({ user }) {
//   return
