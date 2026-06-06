// 검색을 위한 챌린지 및 마켓의 코드와 제목 추출
// 어디서 사용하는가? -> 검색용 컴포넌트의 SelectBox의 options으로 쓰기 위함

// target : 해당 배열 (feed 또는 market)
// codeKey : 해당 배열의 코드
// labelKey : 해당 배열의 카테고리명
export const extractOptions = (target, codeKey, labelKey) => {
  // 일치하는 코드값만 필터링 (중복 제외)
  const filteredCode = target.filter((target, idx, arr) => {
    return idx === arr.findIndex((item) => item[codeKey] === target[codeKey]);
  });

  // 이 Options로 SelectBox의 options props로 전달
  const Options = filteredCode.map((item) => ({
    code: item[codeKey],
    label: item[labelKey],
  }));

  return Options;
};
