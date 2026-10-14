/**
 * 탭 메뉴 설정 객체
 * --> 정적 데이터는 상수로 분리하고,
 * --> 핸들러 등 동적 로직은 사용 컴포넌트에서 재조립하세요!!
 * @typedef {Object} SearchFilterTabMenuConfig
 * @property {Array<{value: string, label: string, badge?: string}>} [tabs] - 탭 목록 배열
 * @property {string} [activeStatus] - 현재 선택된 탭 값
 * @property {Function} [onTabChange] - 탭 변경 시 호출되는 핸들러
 *
 */

/**
 * CTA 버튼 설정 객체
 * @typedef {Object} SearchFilterCtaButtonConfig
 * @property {string} [label] - 버튼에 표시될 텍스트
 * @property {Function} [onClick] - 버튼 클릭 시 실행할 함수 (반드시 콜백 형태로 가져올 것!!)
 */

/**
 * 셀렉트 박스 설정 배열
 * @typedef {Array<Object>} SearchFilterSelectGroupsConfig
 * @property {string} [label] - label 태그 텍스트
 * @property {string} [name] - form 전송용 name 속성 지정
 * @property {string} [placeholder] - "전체" 또는 해당 그룹명
 * @property {Array<code: string, name: string>} [options] - 옵션 목록 배열
 */

/**
 * 라디오 설정 배열
 * @typedef {Array<Object>} SearchFilterRadioGroupsConfig
 * @property {string} [label] - label 태그 텍스트
 * @property {string} [name] - form 전송용 name 속성 지정
 * @property {Array<code: string | boolean, name: string>} [options] - 옵션 목록 배열
 */

/**
 * 체크박스 설정 배열
 * @typedef {Array} SearchFilterCheckboxGroupsConfig
 * @property {string} [label] -
 * @property {Function} [onClick] -
 */

export {};
