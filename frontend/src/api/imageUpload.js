export const imageUpload = (files, type, targetCode) => {
  const formData = new FormData();

  formData.append('type', type);
  formData.append('targetCode', targetCode);

  files.forEach((file) => {
    formData.append('files', file);
  });

  fetch('/images', {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
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
