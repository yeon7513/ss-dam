// 피드 등록
export const sendToFeed = async (data, navigate) => {
  const formData = new FormData();

  formData.append("chalCode", data.chalCode);
  formData.append("title", data.title);
  formData.append("content", data.content);

  // formData 전송 시 배열은 꺼내서 append 해야한다고함..
  // 어렵다 어려워
  if (data.hashtags) {
    data.hashtags.forEach((tag, idx) => {
      formData.append(`hashtags[${idx}].tagName`, tag.tagName);
    });
  }

  if (data.files) {
    data.files.forEach((file) => formData.append("files", file));
  }

  try {
    await fetch("/api/feed", {
      method: "POST",
      body: formData,
    })
    .then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        alert("등록에 실패했습니다.");
      }
    })
    .then((result) => {
      if (result) {
        const newCode = result;

        alert("등록되었습니다.");

        navigate(`/feed/${newCode}`);
      }
    });
  } catch (error) {
    console.error("통신 에러:", error);
    alert("서버 연결에 실패했습니다.");
  }
};

// 피드 전체 조회
export const handleLoadFeeds = async () => {
  try {
    return await fetch("/api/feed", {
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
      }
    });
  } catch (err) {
    console.error(err);
  }

};

// 피드 단일 조회
export const handleFindFeedDetailByFeedCode = (code) => {
  try {
    const detail = fetch(`/api/feed/${code}`, {
      method: "GET",
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      if (result) {
        return result;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

    return detail;
  } catch (error) {
    console.error("통신 에러: ", error);
    return null;
  }
};
