// 피드 등록용 FormData 가공
export const createFeedFormData = (data) => {
  const formData = new FormData();

  console.log("createFeedFormData - data: ", data);

  formData.append("chalCode", data.chalCode);
  formData.append("title", data.title);
  formData.append("content", data.content);

  // formData 전송 시 배열은 꺼내서 append 해야한다고함..
  if (data.hashtags) {
    data.hashtags.forEach((tag, idx) => {
      formData.append(`hashtags[${idx}]`, tag);
    });
  }

  if (data.images) {
    data.images.forEach((file) => formData.append("images", file));
  }

  return formData;
};

