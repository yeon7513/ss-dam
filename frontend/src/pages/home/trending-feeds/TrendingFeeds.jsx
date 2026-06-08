import FeedCard from "../../../components/feed/feed-card/FeedCard";
import styles from "./TrendingFeeds.module.scss";

const testFeeds = [
  {
    chalCode: 3,
    chalTitle: "🏃‍♂️ 쓰담쓰담 동네 플로깅(줍깅) 미션",
    code: 9,
    comments: null,
    content:
      "공식 챌린지는 아직이지만, 주말이라 몸도 풀 겸 집 앞 골목에서 가볍게 플로깅을 해봤습니다.\r\n\r\n생각보다 담배꽁초가 너무 많아서 놀랐네요.\r\n본격적으로 챌린지 시작하면 더 넓은 구역을 청소해 봐야겠어요. 다들 어디로 가실 계획인가요?",
    countComment: 1,
    countFeedLike: 0,
    createdAt: "2026-05-06",
    deleteYn: false,
    files: null,
    hashtags: [
      {
        feedCode: 9,
        tagName: "동네산책",
      },
      {
        feedCode: 9,
        tagName: "선한영향력",
      },
      {
        feedCode: 9,
        tagName: "플로깅",
      },
    ],
    hitcount: 0,
    images: [
      {
        deleteYn: false,
        path: "/images/feed/2026.05/16b09d76-4f06-4cbd-9f18-eece07599952_플로깅2.jpg",
        targetCode: 9,
        type: "feed",
      },
      {
        deleteYn: false,
        path: "/images/feed/2026.05/f7a99de7-0a11-45b2-948c-98667c4d446c_플로깅3.jpg",
        targetCode: 9,
        type: "feed",
      },
      {
        deleteYn: false,
        path: "/images/feed/2026.05/c9ea254e-b3bf-4a65-8b8f-a6e78cc0cf75_플로깅1.jpg",
        targetCode: 9,
        type: "feed",
      },
    ],
    memCode: 14,
    memberProfile: {
      code: 14,
      id: "user14",
      path: null,
      ranking: 14,
      rating: 3,
    },
    status: "ACTIVE",
    title: "챌린지 시작 전 워밍업으로 집 앞 골목 쓸고 왔어요",
    updatedAt: null,
  },
  {
    chalCode: 5,
    chalTitle: "🛒 검은 비닐봉지는 그만! 나만의 에코백 장보기",
    code: 15,
    comments: null,
    content:
      "마트 도착해서 차에서 내리려는데 에코백을 집에 두고 온 걸 깨달았습니다.\r\n예전 같았으면 그냥 종량제 봉투 샀겠지만, 챌린지 중이라 꾹 참고 집까지 다시 돌아갔다 왔어요.\r\n\r\n왕복 15분 더 걸렸지만 절대 후회 없습니다. 앞으로는 현관문 손잡이에 걸어둬야겠어요!",
    countComment: 1,
    countFeedLike: 0,
    createdAt: "2026-05-05",
    deleteYn: false,
    files: null,
    hashtags: [
      {
        feedCode: 15,
        tagName: "에코백장보기",
      },
      {
        feedCode: 15,
        tagName: "습관성형",
      },
      {
        feedCode: 15,
        tagName: "뿌듯한하루",
      },
    ],
    hitcount: 0,
    images: [
      {
        deleteYn: false,
        path: "/images/feed/2026.05/983390ff-f2ff-4a1d-819d-bfb85c90beee_에코백장보기.jpg",
        targetCode: 15,
        type: "feed",
      },
    ],
    memCode: 13,
    memberProfile: {
      code: 13,
      id: "user13",
      path: null,
      ranking: 13,
      rating: 4,
    },
    status: "ACTIVE",
    title: "문 앞까지 갔다가 다시 돌아가서 챙겨온 에코백 🏃‍♂️",
    updatedAt: null,
  },
  {
    chalCode: 3,
    chalTitle: "🏃‍♂️ 쓰담쓰담 동네 플로깅(줍깅) 미션",
    code: 8,
    comments: null,
    content:
      "5월 10일부터 시작하는 플로깅 챌린지 엄청 기대 중입니다.\r\n집에 굴러다니는 낡은 에코백 하나랑 재사용 집게 하나 씻어서 준비해뒀어요.\r\n\r\n챌린지 시작하면 동네 공원 한 바퀴 돌면서 깨끗하게 싹 치우고 오겠습니다. 참여하시는 분들 화이팅!",
    countComment: 1,
    countFeedLike: 0,
    createdAt: "2026-05-05",
    deleteYn: false,
    files: null,
    hashtags: [
      {
        feedCode: 8,
        tagName: "줍깅",
      },
      {
        feedCode: 8,
        tagName: "장비세팅",
      },
      {
        feedCode: 8,
        tagName: "플로깅",
      },
    ],
    hitcount: 0,
    images: [],
    memCode: 6,
    memberProfile: {
      code: 6,
      id: "user06",
      path: null,
      ranking: 6,
      rating: 4,
    },
    status: "ACTIVE",
    title: "다음 주 플로깅 챌린지 장비 세팅 완료! 🗑️",
    updatedAt: null,
  },
];

const TrendingFeeds = () => {
  return (
    <section className={styles.trendingFeeds}>
      <div className={styles.title}>
        <h2>다들 어떻게 실천하고 있을까요?</h2>
        <p>
          소소하지만 확실한 환경 보호 인증샷! 서로 칭찬하고 영감도 얻어보세요.
        </p>
      </div>
      {/* 임시 데이터 */}
      <div className={styles.contents}>
        {testFeeds.map((feed) => (
          <FeedCard key={feed.code} feed={feed} />
        ))}
      </div>
    </section>
  );
};

export default TrendingFeeds;
