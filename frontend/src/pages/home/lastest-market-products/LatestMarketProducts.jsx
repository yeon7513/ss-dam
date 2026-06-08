import ProductCard from "../../../components/market/product-card/ProductCard";
import styles from "./LatestMarketProducts.module.scss";

const testProduct = [
  {
    cateCode: 21,
    categoryName: "스킨케어",
    code: 15,
    content:
      "동물 실험을 하지 않고 식물성 원료로만 만든 비건 수분 크림입니다. \r\n스패출러로 딱 두 번 떠서 썼는데 제 피부 타입(극지성)에는 조금 무거운 감이 있어서 건성 피부이신 분이 쓰시면 딱 맞을 것 같아요.\r\n유리 용기에 담겨 있어서 다 쓰신 후에 재활용하기도 아주 좋습니다!",
    countPick: 0,
    createdAt: "2026-05-15",
    deleteYn: false,
    hitcount: 0,
    images: [
      {
        deleteYn: false,
        path: "/images/market/2026.05/efca4bda-80b2-4f84-96de-c0da50e76707_수분크림.jpg",
        targetCode: 15,
        type: "market",
      },
    ],
    memCode: 15,
    memberProfile: {
      code: 15,
      id: "user15",
      path: null,
      ranking: 15,
      rating: 5,
    },
    price: 16000,
    status: "ON_SALE",
    title: "비건 인증받은 수분 크림 (유통기한 25년 말까지, 2회 사용)",
    updatedAt: null,
  },
  {
    cateCode: 45,
    categoryName: "건강가전",
    code: 14,
    content:
      "재택근무 할 때 목이랑 어깨가 너무 뭉쳐서 샀던 무선 마사지기입니다. \r\n온열 기능도 있고 시원하게 잘 주물러 줘요.\r\n몇 달 잘 썼는데 최근에 안마의자를 들이게 되면서 중복이라 처분합니다. \r\n알코올 스왑으로 닿는 면적 꼼꼼하게 다 소독해 두었어요. C타입 케이블로 충전되는 모델입니다.",
    countPick: 0,
    createdAt: "2026-05-14",
    deleteYn: false,
    hitcount: 0,
    images: [
      {
        deleteYn: false,
        path: "/images/market/2026.05/d75f8210-60bb-41fc-a17a-0b03bb46e0c0_어깨안마기.jpg",
        targetCode: 14,
        type: "market",
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
    price: 22000,
    status: "ON_SALE",
    title: "목/어깨 소형 마사지기 (충전 케이블 포함, 작동 잘 됨)",
    updatedAt: null,
  },
  {
    cateCode: 32,
    categoryName: "외국도서",
    code: 13,
    content:
      "자연주의와 미니멀 라이프의 고전, 헨리 데이비드 소로우의 <월든> 영문 원서입니다. \r\n소장용으로 샀다가 이북(e-book)으로 다시 구매하게 되어 실물 책은 내놓습니다.\r\n표지 구김이나 밑줄 하나도 없는 새 책 퀄리티예요. \r\n환경이나 단순한 삶에 관심 많으신 분들께 적극 추천하는 책입니다.",
    countPick: 0,
    createdAt: "2026-05-13",
    deleteYn: false,
    hitcount: 0,
    images: [
      {
        deleteYn: false,
        path: "/images/market/2026.05/d29aca57-8212-4d19-81e8-e86d433a7bf3_월든2.jpg",
        targetCode: 13,
        type: "market",
      },
      {
        deleteYn: false,
        path: "/images/market/2026.05/00ecb665-0412-4eda-a22e-f75799fc0a3f_월든1.jpg",
        targetCode: 13,
        type: "market",
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
    price: 9000,
    status: "ON_SALE",
    title: "원서 <Walden> (월든) 깨끗한 책 팝니다 (미니멀라이프 추천 도서)",
    updatedAt: null,
  },
  {
    cateCode: 51,
    categoryName: "유아동패션",
    code: 12,
    content:
      "우리 아이가 입던 오가닉 면 내복 3벌 일괄로 저렴하게 드려요. \r\n쑥쑥 크다 보니 몇 번 못 입고 작아졌네요.\r\n밥 먹을 때 흘린 자국이나 무릎 늘어남 없이 상태 정말 깨끗합니다. 무형광 순면이라 피부 예민한 아이들도 안심하고 입을 수 있어요. \r\n쓰레기 줄일 겸 아나바다 해요~",
    countPick: 0,
    createdAt: "2026-05-12",
    deleteYn: false,
    hitcount: 0,
    images: [],
    memCode: 12,
    memberProfile: {
      code: 12,
      id: "user12",
      path: null,
      ranking: 12,
      rating: 2,
    },
    price: 12000,
    status: "ON_SALE",
    title: "아이 작아진 오가닉 내복 3벌 일괄 (무형광, 얼룩 없음)",
    updatedAt: null,
  },
];

const LatestMarketProducts = () => {
  return (
    <section className={styles.lastestProduct}>
      <div className={styles.title}>
        <h2>득템하기 딱 좋은 지금!</h2>
        <p>나에겐 안 쓰지만 누군가에겐 꼭 필요한 물건들이 방금 올라왔어요.</p>
      </div>

      <div className={styles.contents}>
        {testProduct.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LatestMarketProducts;
