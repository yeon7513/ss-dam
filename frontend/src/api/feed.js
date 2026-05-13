export const sendToFeed = async (data, navigate) => {
  try {
    const res = await fetch('/feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const code = await res.text();

      alert('등록되었습니다.');

      navigate(`/feed/${code}`);
    } else {
      alert('등록에 실패했습니다.');
    }
  } catch (error) {
    console.error('통신 에러:', error);
    alert('서버 연결에 실패했습니다.');
  }
};
