import React, { useEffect, useState } from "react";

const MyPage = () => {
  // 데이터를 담아둘 상태(state)들
  const [comments, setComments] = useState([]);
  const [member, setMember] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 1. 모든 API를 동시에 호출 (성능 최적화)
        const [commentRes, memberRes, hashtagRes] = await Promise.all([
          fetch("http://localhost:9090/comment/3"),
          fetch("http://localhost:9090/member/3"),
          fetch("http://localhost:9090/hashtag/3"),
        ]);

        // 2. 응답을 JSON으로 변환
        const commentData = await commentRes.json();
        const memberData = await memberRes.json();
        const hashtagData = await hashtagRes.json();

        // 3. 상태에 저장 및 콘솔 확인
        setComments(commentData);
        setMember(memberData[0]); // member는 배열 안에 객체가 하나 있으므로 [0] 선택
        setHashtags(hashtagData);

        console.log("✅ 댓글 데이터:", commentData);
        console.log("✅ 회원 정보:", memberData[0]);
        console.log("✅ 해시태그:", hashtagData);
      } catch (error) {
        console.error("❌ 데이터 로드 중 에러 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div>데이터를 불러오는 중입니다... 🚀</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>데이터 수신 테스트</h1>
      <hr />

      {/* 회원 정보 확인 */}
      {member && (
        <section>
          <h3>
            사용자: {member.id} (랭킹: {member.ranking})
          </h3>
        </section>
      )}

      {/* 해시태그 확인 */}
      <div>
        <strong>태그: </strong>
        {hashtags.map((tag, idx) => (
          <span key={idx}>#{tag.tagName} </span>
        ))}
      </div>

      {/* 댓글 리스트 확인 */}
      <ul>
        {comments.map((c) => (
          <li key={c.code}>
            {c.content} (❤️{c.countLike})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;
