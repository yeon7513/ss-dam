import { useCallback, useEffect, useState } from "react";

// Redux를 사용하면 좋지만...
// 학습 곡선이 높기 때문에 커스텀 훅으로 대체함.

// 데이터 조회용 커스텀 훅
export const useLoadData = (url) => {
  // 실제 데이터가 담기는 state
  // 초기값은 null, 배열이거나 단일 상세 조회일 수도 있으니까.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩용
  const [error, setError] = useState(null); // 에러용
  const [message, setMessage] = useState(null);


  // 관리자 대시보드의 "새로고침" 버튼때문에
  // fetch 로직을 함수로 분리해야함.
  const handleFetchData = useCallback(() => {
    // url이 비어있으면 바로 종료
    if (!url) {
      return;
    }

    // 렌더링 경쟁을 방지하기 위한 변수
    // 즉, 오래된 응답은 무시함
    let ignore = false;

    // fetch가 완료 되기 전 loading 중...
    setLoading(true);

    // 실제 서버 전송용 로직
    fetch(url)
    .then(res => {
      if (!res.ok) {
        // 여기서 오류를 던지면 바로 catch절로 이동
        return res.json().then(err => {
          throw err;
        })
      }

      // 응답이 ok이면 json 데이터 반환
      return res.json();
    })
    .then(result => {
      if (!ignore) {
        setData(result.data);
        setLoading(false);
      }
    })
    .catch(err => {
      if (!ignore) {
        setMessage(err.message);
        setError(err);
        setLoading(false);
      }
    });

    return () => {
      ignore = true;
    }
  }, [url]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    return handleFetchData();
  }, [handleFetchData]); // url이 바뀔 때만 실행

  return { data, loading, error, message, refetch: handleFetchData };
};
