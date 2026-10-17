import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./Supports.module.scss";

const FAQ_LIST = [
  {
    id: 1,
    question: "챌린지는 어떻게 참여하나요?",
    answer:
      "원하는 챌린지를 선택한 후 참여 버튼을 클릭하고, 인증 사진이나 글을 작성하면 참여가 완료됩니다.",
  },
  {
    id: 2,
    question: "마켓에서 어떤 상품을 구매할 수 있나요?",
    answer:
      "친환경 제품, 재사용 가능한 생활용품, 제로웨이스트 관련 상품 등을 구매할 수 있으며, 일부 상품은 사용자 간 거래도 가능합니다.",
  },
  {
    id: 3,
    question: "포인트는 어떻게 적립되나요?",
    answer:
      "챌린지 참여, 인증 게시글 작성, 활동 참여 등을 통해 포인트가 적립되며, 적립된 포인트는 마켓에서 사용할 수 있습니다.",
  },
  {
    id: 4,
    question: "회원 정보는 어디에서 변경하나요?",
    answer:
      "마이페이지 > 내 정보 > 정보 변경에서 비밀번호, 전화번호, 주소와 프로필 사진을 변경할 수 있습니다.",
  },
  {
    id: 5,
    question: "회원 탈퇴는 어떻게 하나요?",
    answer:
      "마이페이지 > 내 정보 > 회원 탈퇴에서 안내사항을 확인한 후 탈퇴를 진행할 수 있습니다.",
  },
];

export default function Supports() {
  const [keyword, setKeyword] = useState("");
  const [openedId, setOpenedId] = useState(null);

  const searchWord = keyword.trim().toLowerCase();

  const filteredFaqs = FAQ_LIST.filter(({ question, answer }) =>
    `${question} ${answer}`.toLowerCase().includes(searchWord),
  );

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
    setOpenedId(null);
  };

  const toggleFaq = (id) => {
    setOpenedId((previous) => (previous === id ? null : id));
  };

  return (
    <main className={styles.page}>
      <section className={styles.searchSection}>
        <h1>안녕하세요, 무엇을 도와드릴까요?</h1>

        <div className={styles.searchBox} role="search">
          <FiSearch aria-hidden="true" />

          <input
            type="search"
            aria-label="자주 묻는 질문 검색"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={handleSearchChange}
          />
        </div>
      </section>

      <section
        className={styles.faqSection}
        aria-labelledby="faq-title"
      >
        <div className={styles.container}>
          <header className={styles.faqHeader}>
            <span>FAQ</span>
            <h2 id="faq-title">자주 묻는 질문</h2>
            <p>궁금한 내용을 확인해보세요.</p>
          </header>

          <p className={styles.resultCount} role="status">
            {searchWord
              ? `검색 결과 ${filteredFaqs.length}건`
              : `전체 ${filteredFaqs.length}건`}
          </p>

          {filteredFaqs.length > 0 ? (
            <ul className={styles.faqList}>
              {filteredFaqs.map((faq) => {
                const isOpen = openedId === faq.id;

                return (
                  <li key={faq.id} className={styles.faqItem}>
                    <h3 className={styles.questionHeading}>
                      <button
                        id={`faq-question-${faq.id}`}
                        type="button"
                        className={styles.question}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span>
                          <span className={styles.questionMark}>Q.</span>
                          {faq.question}
                        </span>

                        <span className={styles.toggleIcon} aria-hidden="true">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-answer-${faq.id}`}
                      className={styles.answer}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      hidden={!isOpen}
                    >
                      <span className={styles.answerMark}>A.</span>
                      <p>{faq.answer}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.empty}>
              <p>검색 결과가 없습니다.</p>
              <span>다른 검색어로 다시 검색해주세요.</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}