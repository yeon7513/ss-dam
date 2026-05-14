import { HOST } from '../lib/url';

export const sendToFeed = async (data, navigate) => {
  const formData = new FormData();

  formData.append('chalCode', data.chalCode);
  formData.append('title', data.title);
  formData.append('content', data.content);

  // formData 전송 시 배열은 꺼내서 append 해야한다고함..
  // 어렵다 어려워
  data.hashtags.forEach((tag, idx) => {
    formData.append(`hashtags[${idx}].tagName`, tag.tagName);
  });
  data.files.forEach((file) => formData.append('files', file));

  try {
    const res = await fetch(`${HOST}/feed`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const code = await res.text();

      alert('등록되었습니다.');

      navigate(`/feed/${code}`);

      console.log(code);
    } else {
      alert('등록에 실패했습니다.');
    }
  } catch (error) {
    console.error('통신 에러:', error);
    alert('서버 연결에 실패했습니다.');
  }
};
