// 기존 찾기 API는 @RequestBody 없이 폼 파라미터를 받는다.
async function postAccountForm(path, values, { lookup = false } = {}) {
  const response = await fetch(`/api/auth/find/${path}`, {
    method: "POST",
    credentials: "same-origin",
    body: new URLSearchParams(values),
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    if (lookup && [401, 404].includes(response.status)
      && ["아이디 조회 실패", "비밀번호 조회 실패"].includes(result?.message)) {
      throw new Error("입력하신 정보와 일치하는 회원을 찾을 수 없습니다.");
    }
    if (response.status === 404) {
      throw new Error("계정 찾기 요청 경로를 확인할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
    throw new Error(response.status >= 500
      ? "서버 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
      : result?.message || "요청에 실패했습니다. 다시 시도해주세요.");
  }
  return result.data;
}

export const findMemberId = (values) => postAccountForm("id", values, { lookup: true });
export const findMemberPassword = (values) => postAccountForm("password", values, { lookup: true });
export const changeMemberPassword = (values) => postAccountForm("changepassword", values);
