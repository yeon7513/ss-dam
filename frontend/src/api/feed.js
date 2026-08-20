// 피드 단일 조회
export const handleFindFeedDetailByFeedCode = (code) => {
  try {
    return fetch(`/api/feed/${code}`, {
      method: "GET",
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      if (result) {
        console.log(result);
        return result;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
  } catch (error) {
    console.error("통신 에러: ", error);
    return null;
  }
};

