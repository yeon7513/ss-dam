export const PROCESS_LABELS = {
  REVIEW: "신고 검토 시작",
  PROCESS: "신고 처리(기존 기록)",
  RESOLVE: "신고 처리 완료",
  REJECT: "신고 기각",
  CANCEL: "조치 취소",

  CREATE: "등록",
  UPDATE: "수정",
  DELETE: "삭제",
  RESTORE: "복구",
  EARLY_END: "조기 종료",

  RESTRICT: "직접 정지",
  RELEASE: "직접 정지 해제",

  WARNING: "경고",
  WARNING_CANCEL: "경고 취소",
  WARNING_RESTORE: "경고 재적용",

  SUSPEND: "신고에 의한 정지",
  SUSPEND_CANCEL: "신고 정지 조치 취소",
  SUSPEND_RESTORE: "신고 정지 조치 재적용",

  WITHDRAW: "강제 탈퇴 조치",
  WITHDRAW_CANCEL: "강제 탈퇴 조치 취소",
  WITHDRAW_RESTORE: "강제 탈퇴 조치 재적용",
};

export function getProcessLabel(targetType, processType) {
  if (targetType === "report") {
    if (processType === "CANCEL") return "신고 조치 취소";
    if (processType === "RESTORE") return "신고 조치 재적용";
  }

  return PROCESS_LABELS[processType] ?? "기타 처리";
}
