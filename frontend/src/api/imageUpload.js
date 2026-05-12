export const imageUpload = (type, targetCode) => {
  const imageData = {
    type,
    targetCode,
  };

  fetch('/images', {
    method: 'POST',
    params: {
      imageData,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.body();
      } else {
        alert('Err');
      }
    })
    .then((result) => {
      if (result) {
        alert('업로드 성공');
      } else {
        alert('업로드 실패');
      }
    })
    .catch((err) => console.error(err));
};
