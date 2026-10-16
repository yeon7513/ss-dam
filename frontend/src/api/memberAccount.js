async function readResponse(response) {
  const result = await response.json().catch(() => null);

  if (!response.ok || result?.success === false) {
    throw new Error(result?.message || "요청 처리에 실패했습니다.");
  }

  return result;
}

// 회원 정보 수정
export async function updateMember(authFetch, form) {
  const data = new FormData();

  data.append("password", form.password);
  data.append("phone", form.phone);
  data.append("address", form.address);

  if (form.file) {
    data.append("file", form.file);
  }

  const response = await authFetch("/api/member/update", {
    method: "PATCH",
    body: data,
  });

  // FormData 사용 시 Content-Type은 직접 설정하지 않습니다.
  return readResponse(response);
}

// 회원 탈퇴
export async function deleteMember(authFetch) {
  const response = await authFetch("/api/member/delete", {
    method: "DELETE",
  });

  return readResponse(response);
}