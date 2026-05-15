import { HOST } from '../lib/url';

export const sendToSignup = async (data, navigate) => {
  const formData = new FormData();

  formData.append('id', data.id);
  formData.append('password', data.password);
  formData.append('name', data.name);
  formData.append('address', data.address);
  formData.append('phone', data.phone);

  if (data.file) {
    formData.append('file', data.file);
  }

  try {
    await fetch(`${HOST}/member`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((result) => {
        if (result === 'success') {
          alert('회원가입 완료');
          navigate('/');
        }
      });
  } catch (error) {
    console.error('통신 에러: ', error);
    alert('서버 연결에 실패했습니다.');
  }
};
