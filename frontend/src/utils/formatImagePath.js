import { HOST } from "../lib/url.js";

// 26.09.01
// 이미지 경로를 서버쪽에서 처리하려고했는데
// 이미 DB에서 이미지를 불러올 때 경로만 따로 추출해 DTO에 담고 있었음.
// 백엔드에서 서버 경로를 붙여 예쁘게 렌더링되게 하고 싶었지만..
// 이미지 경로를 사용하는 모든 DTO나 서비스에서 가공해야하는 불편함을 발견함. (코드 중복)
// 그럼 아예 프론트엔드에서 서버 경로를 프리픽스로 붙여 반환하는 유틸 함수를 만드는 것이
// 조금 더 효율적이라고 생각함. (현재 상황으로는..이게 최선임!)
export const formatImagePath = (path) => {
  if (!path) {
    return null;
  }

  // 임시 메모리URL(URL.createObjectURL, 즉 blob:)에 저장된 미리보기용 이미지이거나
  // 이미 절대 경로(http:// or https://)거나
  // 프로젝트에 존재하는 고정 이미지(/src/assets)일 경우 그대로 반환
  if (path.startsWith("blob:")
    || path.startsWith("http://")
    || path.startsWith("https://")
    || (!path.startsWith("/images") && path.startsWith("/src/assets"))) {
    return path;
  }

  // 그 외에는 모두 서버 경로를 프리픽스로 붙여 반환
  return `${HOST}${path}`;
}

