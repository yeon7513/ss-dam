import cn from "classnames";
import { useState } from "react";
import {
  FiBell,
  FiBookmark,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiHeart,
  FiMessageCircle,
  FiPlusCircle,
  FiSend,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "../../components/auth/profile-card/ProfileCard.jsx";
import Button from "../../components/common/button/Button.jsx";
import StatCard from "../../components/common/card/StatCard.jsx";
import ImageBox from "../../components/common/image-box/ImageBox.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Sidebar from "../../layout/default/sidebar/Sidebar.jsx";
import { MYPAGE_MENU } from "../../lib/sideMenu.js";
import styles from "./MyPage.module.scss";

/* ---------- 프로필 화면 (관리자 회원 상세에서 가져옴) ---------- */
const RATING_ICONS = {
  1: "🌱",
  2: "🌿",
  3: "🌳",
  4: "🌸",
  5: "👑",
};

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("ko-KR") : "-";

const formatNumber = (value) =>
  value == null ? "-" : Number(value).toLocaleString("ko-KR");

// 모든 버튼/링크는 일단 메인 페이지로 (나중에 실제 경로로 교체)
const HOME = "/";

// 백엔드 연결 전 더미 (로그인 정보에 없는 값) → 연결 후 삭제
const DUMMY = {
  createdAt: "2026-03-26",
  ranking: 12,
  point: 1800,
  completedChallengeCount: 3,
};

const PROGRESS = { current: "새싹", next: "줄기", percent: 65, remain: 200 };

const SHORTCUTS = [
  { label: "그루 충전", icon: <FiPlusCircle /> },
  { label: "그루 송금", icon: <FiSend /> },
  { label: "오늘 인증", icon: <FiCheckCircle /> },
  { label: "나의 Pick", icon: <FiBookmark /> },
];

const NOTICES = [
  {
    id: 1,
    type: "like",
    title: "배달 시 일회용품 안받기 8일차!",
    desc: "USER_USER님이 해당 피드에 '좋아요'를 표시했습니다.",
  },
  {
    id: 2,
    type: "like",
    title: "배달 시 일회용품 안받기 8일차!",
    desc: "USER_USER님이 해당 피드에 '좋아요'를 표시했습니다.",
  },
  {
    id: 3,
    type: "comment",
    title: "배달 시 일회용품 안받기 8일차!",
    desc: "USER_USER님이 해당 피드에 댓글을 남겼습니다.",
  },
  {
    id: 4,
    type: "comment",
    title: "배달 시 일회용품 안받기 8일차!",
    desc: "USER_USER님이 해당 피드에 댓글을 남겼습니다.",
  },
];

const CHATS = [
  {
    id: 1,
    title: "Market title",
    name: "Jane Doe",
    grade: "Royal Grade",
    time: "1분 전",
    message: "Egestas elit dui scelerisque ut eu purus aliquam vitae habi...",
  },
  {
    id: 2,
    title: "Market title",
    name: "John Doe",
    grade: "Royal Grade",
    time: "3분 전",
    message: "Egestas elit dui scelerisque ut eu purus aliquam vitae habi...",
  },
];

const STATS = [
  { title: "내가 살린 나무", value: "118그루", rate: "+2그루 (전월 대비)" },
  { title: "탄소 절감량", value: "4.8 kg", rate: "-1.2% (어제 대비)" },
  { title: "절약한 일회용품", value: "156개", rate: "-11% (이번주 대비)" },
];

const MY_CHALLENGES = [
  { code: 1, title: "챌린지명 1", period: "2026.03.31 - 2026.04.07" },
  { code: 2, title: "챌린지명 2", period: "2026.03.31 - 2026.04.07" },
  { code: 3, title: "챌린지명 3", period: "2026.03.31 - 2026.04.07" },
];

function MyProfile({ user }) {
  const navigate = useNavigate();
  const goHome = () => navigate(HOME);

  // 백엔드 연결 시: useLoadData("/api/mypage/summary")의 data로 교체
  const member = { ...DUMMY, ...user, path: user?.profileImage };

  return (
    <div className={styles.container}>
      <div className={styles.topGrid}>
        {/* ===== 왼쪽: 프로필 카드 ===== */}
        <section className={styles.profilePanel} aria-label="회원 기본 정보">
          <div className={styles.profileTop}>
            {/* 왼쪽 프로필 사진 */}
            <div className={styles.profileImage}>
              {member.path ? (
                <img src={member.path} alt={`${member.name} 프로필`} />
              ) : (
                <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <rect
                    x="10"
                    y="10"
                    width="44"
                    height="44"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    d="M12 12L52 52M52 12L12 52"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              )}
            </div>

            {/* 오른쪽 회원 정보 */}
            <div className={styles.profileInfo}>
              <div className={styles.identity}>
                <strong className={styles.memberName}>
                  <span
                    className={styles.ratingIcon}
                    role="img"
                    aria-label={`${member.rating ?? "미정"}등급`}
                    title={`${member.rating ?? "미정"}등급`}
                  >
                    {RATING_ICONS[member.rating] ?? "🏷️"}
                  </span>
                  {member.name || "-"}
                </strong>

                <span className={styles.memberId}>({member.id})</span>
              </div>

              <div className={styles.dates}>
                <span>가입일 {formatDate(member.createdAt)}</span>
              </div>

              <dl className={styles.details}>
                <div>
                  <dt>회원 등급</dt>
                  <dd>
                    {member.rating == null ? "-" : `${member.rating}등급`}
                  </dd>
                </div>
                <div>
                  <dt>회원 랭킹</dt>
                  <dd>
                    {member.ranking == null
                      ? "-"
                      : `${formatNumber(member.ranking)}위`}
                  </dd>
                </div>
                <div>
                  <dt>보유 포인트</dt>
                  <dd>{formatNumber(member.point)}</dd>
                </div>
                <div>
                  <dt>완료한 챌린지</dt>
                  <dd>{formatNumber(member.completedChallengeCount)}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* 정보 수정 / 로그아웃 */}
          <div className={styles.profileActions}>
            <Button btnStyle="outline" size="sm" fullWidth onClick={goHome}>
              정보 수정
            </Button>
            <Button btnStyle="outline" size="sm" fullWidth onClick={goHome}>
              로그아웃
            </Button>
          </div>

          {/* 등급 진행도 */}
          <div className={styles.progress}>
            <strong>절반 넘게 달렸어요. 조금만 더!</strong>
            <div className={styles.progressRow}>
              <span>{PROGRESS.current}</span>
              <div className={styles.bar}>
                <i style={{ width: `${PROGRESS.percent}%` }} />
              </div>
              <span>{PROGRESS.next}</span>
            </div>
            <p>다음 등급까지 {formatNumber(PROGRESS.remain)}P가 남았어요!</p>
          </div>

          {/* 바로가기 (기존 원형 스타일 재사용) */}
          <div className={styles.statistics}>
            {SHORTCUTS.map((item) => (
              <Link
                to={HOME}
                className={`${styles.statCircle} ${styles.shortcut}`}
                key={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 오른쪽: 피드 알림 + 새로운 채팅 ===== */}
        <section
          className={styles.sidePanel}
          aria-label="피드 알림과 새로운 채팅"
        >
          <div>
            <div className={styles.sideHead}>
              <h2>피드 알림</h2>
              <Link
                to={HOME}
                className={styles.moreLink}
                aria-label="피드 알림 더 보기"
              >
                <FiExternalLink />
              </Link>
            </div>
            <div className={styles.noticeList}>
              {NOTICES.map((n) => (
                <Link to={HOME} className={styles.notice} key={n.id}>
                  <span className={styles.noticeIcon}>
                    {n.type === "like" ? <FiHeart /> : <FiMessageCircle />}
                  </span>
                  <span className={styles.noticeText}>
                    <strong>{n.title}</strong>
                    <span>{n.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={styles.sideHead}>
              <h2>새로운 채팅</h2>
              <Link
                to={HOME}
                className={styles.moreLink}
                aria-label="채팅 더 보기"
              >
                <FiExternalLink />
              </Link>
            </div>
            <div className={styles.chatList}>
              {CHATS.map((c) => (
                <Link to={HOME} className={styles.chatCard} key={c.id}>
                  <span className={styles.chatTitle}>
                    <FiMessageCircle />
                    {c.title}
                  </span>
                  <span className={styles.chatUser}>
                    <span className={styles.avatar}>
                      <FiUser />
                    </span>
                    <span className={styles.chatName}>
                      <strong>{c.name}</strong>
                      <span>{c.grade}</span>
                    </span>
                    <span className={styles.chatTime}>{c.time}</span>
                  </span>
                  <span className={styles.chatMsg}>{c.message}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ===== 통계 카드 3개 (공용 StatCard) ===== */}
      <div className={styles.statRow}>
        {STATS.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* ===== 진행 중인 챌린지 ===== */}
      <section className={styles.challenges}>
        <h2>진행 중인 챌린지</h2>
        <div className={styles.challengeList}>
          {MY_CHALLENGES.map((c) => (
            <Link to={HOME} className={styles.challengeCard} key={c.code}>
              <div className={styles.challengeThumb}>
                <ImageBox src={c.imageUrl} alt={c.title} />
              </div>
              <div className={styles.challengeBody}>
                <strong>{c.title}</strong>
                <span>{c.period}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- 마이페이지 (왼쪽 메뉴 + 본문) ---------- */
function MyPage() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  // 하위 메뉴가 있는 카테고리는 기본으로 펼침
  const [open, setOpen] = useState(() =>
    Object.fromEntries(
      MYPAGE_MENU.filter((m) => m.subMenus).map((m) => [m.category, true]),
    ),
  );
  const toggle = (category) =>
    setOpen((prev) => ({ ...prev, [category]: !prev[category] }));

  const isActive = (item) =>
    item.path
      ? pathname === item.path
      : item.subMenus?.some((s) => s.path && pathname === s.path);

  const alertCount = 9; // 더미: 알림 데이터가 정해지면 연결

  return (
    <main className={styles.wrap}>
      <div className={styles.sideNavWrap}>
        <Sidebar className={styles.nav} isFixed={false}>
          {/* 프로필 + 설정/알림 */}
          <li className={styles.profile}>
            <ProfileCard
              memberProfile={user && { ...user, path: user.profileImage }}
              isMinimal
              badge={
                <span className={styles.utils}>
                  <Link to="/mypage/edit_profile" aria-label="정보 변경">
                    <FiSettings />
                  </Link>
                  <button
                    type="button"
                    aria-label="알림"
                    className={styles.bell}
                  >
                    <FiBell />
                    {alertCount > 0 && (
                      <i className={styles.dot}>{alertCount}</i>
                    )}
                  </button>
                </span>
              }
            />
          </li>

          {/* 메뉴 */}
          {MYPAGE_MENU.map((item) => {
            const single = Boolean(item.path);

            return (
              <li key={item.category} className={styles.group}>
                {single ? (
                  <Link
                    to={item.path}
                    className={cn(
                      styles.header,
                      isActive(item) && styles.active,
                    )}
                  >
                    <span>{item.category}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      styles.header,
                      isActive(item) && styles.active,
                    )}
                    onClick={() => toggle(item.category)}
                  >
                    <span>{item.category}</span>
                    {open[item.category] ? <FiChevronDown /> : <FiChevronUp />}
                  </button>
                )}

                {!single && open[item.category] && (
                  <ul className={styles.subMenu}>
                    {item.subMenus.map(({ name, path }) => (
                      <li key={name}>
                        <Link
                          to={path || "#"}
                          className={cn(
                            path && pathname === path && styles.subActive,
                          )}
                          onClick={(e) =>
                            !path &&
                            (e.preventDefault(),
                            alert("준비 중인 페이지입니다."))
                          }
                        >
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </Sidebar>
      </div>

      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  );
}

export default MyPage;
