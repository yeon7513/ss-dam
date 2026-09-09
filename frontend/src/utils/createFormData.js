// 공통 FormData 생성 유틸리티 함수
export const createFormData = (data) => {
  const formData = new FormData();

  console.log("createFormData: ", data);

  Object.entries(data).forEach(([key, value]) => {
    // 값이 falsy하다면 건너뜀
    if (value === null || value === undefined) return;

    // 이미지 수정 없이 처리할 경우 imagePaths는 제외
    // -> imagePaths는 읽기 전용! 실제 전송은 images만
    if (key === 'imagePaths' && data.images) {
      return;
    }

    // 이미지 처리
    if (key === 'images' && Array.isArray(value)) {
      value.forEach((item, idx) => {
        // 배열(data.images)에 저장된 순서, 즉 IMAGES 테이블의 order_seq에 저장될 숫자

        const orderSeq = idx + 1;
        console.log("orderSeq: ", orderSeq);

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

  console.log("imagePaths:", formData.getAll("imagePaths"));
  console.log("oldImageOrders:", formData.getAll("oldImageOrders"));
  console.log("images:", formData.getAll("images"));
  console.log("newImageOrders:", formData.getAll("newImageOrders"));

  return formData;
}
