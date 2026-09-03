// 피드 등록 및 수정용 FormData 가공
export const createFeedFormData = (data) => {
  const formData = new FormData();

  if (data.code) {
    formData.append("code", data.code);
  }
  
  formData.append("chalCode", data.chalCode);
  formData.append("title", data.title);
  formData.append("content", data.content);

  // 해시태그 추가
  if (data.hashtags) {
    // formData 전송 시 배열은 꺼내서 append 해야한다고함..
    data.hashtags.forEach(tag => {
      formData.append("hashtags", tag);
    });
  }

  // 이미지 처리 (기존 경로 문자열과 새로 첨부된 File 객체 분리)
  if (data.images) {
    data.images.forEach((item, idx) => {
      // 배열(data.images)에 저장된 순서, 즉 IMAGES 테이블의 order_seq에 저장될 숫자

      const orderSeq = idx + 1;

      if (typeof item === "string") {
        // item의 데이터 타입이 문자열이면?
        // -> 기존 이미지 경로
        formData.append("imagePaths", item);
        formData.append("oldImageOrders", orderSeq);
      } else if (item instanceof File) {
        // item의 데이터 타입이 파일 객체라면?
        // -> 새로 등록할 이미지 파일
        formData.append("images", item);
        formData.append("newImageOrders", orderSeq);
      }
    });
  }

  return formData;
};
