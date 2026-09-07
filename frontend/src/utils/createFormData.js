// 공통 FormData 생성 유틸리티 함수
export const createFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach(([key, value]) => {
    // 값이 falsy하다면 건너뜀
    if (!value) return;

    // 이미지 처리
    if (key === 'images') {
      value.forEach((item, idx) => {
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
    } else if (Array.isArray(value)) {
      // 그 외 값들이 배열일 경우
      value.forEach(item => formData.append(key, item))
    } else {
      // 단일 데이터일 경우 한번만 append
      formData.append(key, value);
    }
  });

  return formData;
}
