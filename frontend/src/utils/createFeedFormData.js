// 피드 등록 및 수정용 FormData 가공
export const createFeedFormData = (data) => {
  const formData = new FormData();

  formData.append("chalCode", data.chalCode);
  formData.append("title", data.title);
  formData.append("content", data.content);

  // 해시태그 추가
  if (data.hashtags) {
    // formData 전송 시 배열은 꺼내서 append 해야한다고함..
    data.hashtags.forEach((tag, idx) => {
      formData.append(`hashtags[${idx}]`, tag);
    });
  }

  // 이미지 처리 (기존 경로 문자열 vs 새로 첨부된 File 객체 분리)
  if (data.images) {
    // 기존 이미지 경로 문자열 처리
    const existingImages = data.images.filter((file) => typeof file === "string");
    existingImages.forEach((path) => {
      formData.append("imagePaths", path);
    });

    // 새로 추가된 이미지 파일 처리
    const newImages = data.images.filter((file) => file instanceof File);
    newImages.forEach((file) => {
      formData.append("images", file)
    });
  }

  return formData;
};

