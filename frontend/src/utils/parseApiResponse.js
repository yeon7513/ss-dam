// utils/parseApiResponse.js

// 조회 요청의 기본 에러 메시지
const DEFAULT_MESSAGES = {
  401: '로그인이 필요합니다.',
  403: '조회 권한이 없습니다.',
  404: '조회할 데이터가 없습니다.',
};

// 챌린지 조기 완료 전용 에러 메시지
export const END_CHALLENGE_MESSAGES = {
  403: '조기 완료 권한이 없습니다.',
  404: '존재하지 않거나 삭제된 챌린지입니다.',
  409: '현재 진행 기간인 챌린지만 조기 완료할 수 있습니다.',
};

// Json 변환과 응답 처리
// 응답 검사 후 data 반환, 실패하면 에러 발생
export async function parseApiResponse(
  response,
  messages = {},
  fallbackMessage = '데이터를 불러오지 못했습니다.',
  { requireData = true, preferServerMessage = false } = {},
) {
  const result = await response.json().catch(() => null);
  const errorMessages = { ...DEFAULT_MESSAGES, ...messages };

  if (!response.ok || !result?.success) {
    const statusMessage = errorMessages[response.status];
    const message = preferServerMessage
      ? result?.message || statusMessage
      : statusMessage || result?.message;

    throw new Error(message || fallbackMessage);
  }

  if (requireData && result.data == null) {
    throw new Error('응답 데이터가 없습니다.');
  }

  return result.data;
}
