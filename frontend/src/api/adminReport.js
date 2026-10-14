// frontend/src/api/adminReport.js

const BASE = "/api/admin/reports";

async function request(path = "", options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    const fallback =
      response.status === 401
        ? "로그인이 필요합니다."
        : response.status === 403
          ? "접근 권한이 없습니다."
          : "요청을 처리하지 못했습니다.";

    throw new Error(result?.message || result?.detail || fallback);
  }

  return result?.data;
}

export function loadReports(params, signal) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      query.set(key, String(value));
    }
  });

  return request(`?${query}`, { signal });
}

export function loadReport(code, signal) {
  return request(`/${code}`, { signal });
}

function patch(path, body) {
  return request(path, {
    method: "PATCH",
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

export const reviewReport = (code) =>
  patch(`/${code}/review`);

export const resolveReport = (code, body) =>
  patch(`/${code}/resolve`, body);

export const rejectReport = (code, processMemo) =>
  patch(`/${code}/reject`, { processMemo });

export const cancelReportAction = (code, logCode, processMemo) =>
  patch(`/${code}/actions/${logCode}/cancel`, { processMemo });

export const restoreReportAction = (code, logCode, processMemo) =>
  patch(`/${code}/actions/${logCode}/restore`, { processMemo });

// 실제 DB에서 사용하는 사유 코드와 일치하도록 조정
export const REASONS = {
  SPAM: "광고·도배",
  FRAUD: "사기·허위 정보",
  ABUSE: "욕설·비방",
  HARASSMENT: "괴롭힘",
};

export const TARGETS = {
  feed: "피드",
  market: "상품",
  comment: "댓글",
  user: "회원",
};

export const STATUSES = {
  PENDING: "대기",
  IN_REVIEW: "검토 중",
  RESOLVED: "처리 완료",
  REJECTED: "기각",
};

export const ACTIONS = {
  REJECT: "반려",
  WARNING: "경고",
  SUSPEND: "정지",
  WITHDRAW: "강제 탈퇴",
};

// 서버 LocalDateTime 문자열을 그대로 표시
export function formatDate(value) {
  return value ? value.replace("T", " ").slice(0, 16) : "-";
}