export async function loadAdminActivityLogs(params, signal) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      query.set(key, String(value));
    }
  });

  const response = await fetch(`/api/admin/logs?${query}`, {
    credentials: "include",
    signal,
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    const message =
      response.status === 401
        ? "관리자로 로그인해 주세요."
        : response.status === 403
          ? "조회 권한이 없습니다."
          : "관리자 활동 로그를 불러오지 못했습니다.";

    throw new Error(result?.message || result?.detail || message);
  }

  if (!Array.isArray(result?.data?.content) || !result?.data?.pager) {
    throw new Error("활동 로그 응답 형식을 확인해 주세요.");
  }

  return result.data;
}