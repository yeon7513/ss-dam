import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { REASONS } from "../../api/adminReport.js";
import { useLoadData } from "../../hooks/useLoadData.js";
import styles from "./PostReport.module.scss";

export default function PostReport({ targetType = "market" }) {
  const { code } = useParams();
  const navigate = useNavigate();
  const isFeed = targetType === "feed";
  const isUser = targetType === "user";
  const targetLabel = isUser ? "회원" : isFeed ? "피드" : "상품";
  const returnPath = isFeed || isUser ? "/feed" : `/market/${code}`;
  const { data: product, loading, error: loadError } = useLoadData(
    isUser ? `/api/member/${code}` : isFeed ? `/api/feeds/${code}` : `/api/market/products/${code}`,
  );

  const [reasonType, setReasonType] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const sending = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending.current || loading || loadError || !product) return;

    const targetCode = Number(code);

    if (!Number.isSafeInteger(targetCode) || targetCode < 1) {
      setError(`올바르지 않은 ${targetLabel} 번호입니다.`);
      return;
    }

    if (!reasonType) {
      setError("신고 사유를 선택해 주세요.");
      return;
    }

    sending.current = true;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetCode,
          reasonType,
          content: content.trim(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        const fallback =
          response.status === 401
            ? "로그인 후 신고해 주세요."
            : response.status === 403
              ? "일반 회원만 신고할 수 있습니다."
              : response.status === 409
                ? "이미 접수되어 처리 중인 신고입니다."
                : "신고 접수에 실패했습니다.";

        throw new Error(result?.message || result?.detail || fallback);
      }

      alert("신고가 접수되었습니다.");
      navigate(returnPath, { replace: true });
    } catch (err) {
      setError(err.message || "잠시 후 다시 시도해 주세요.");
    } finally {
      sending.current = false;
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>{isUser ? "회원 신고하기" : "게시글 신고하기"}</h2>
      <div className={styles.productInfo}>
        <span className={styles.caption}>신고 대상 {targetLabel}</span>
        {loading ? (
          <p role="status">{targetLabel} 정보를 불러오는 중입니다.</p>
        ) : loadError || !product ? (
          <p role="alert">{targetLabel} 정보를 불러오지 못했습니다. 이전 화면에서 다시 시도해 주세요.</p>
        ) : (
          <p className={styles.productTitle}>{isUser ? product.id : product.title}</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset className={styles.fields} disabled={submitting || loading || !!loadError || !product}>
          <legend className={styles.srOnly}>신고 내용</legend>

          <label className={styles.label} htmlFor="reasonType">신고 사유 <span className={styles.required}>(필수)</span></label>
          <select
            id="reasonType"
            value={reasonType}
            onChange={(event) => setReasonType(event.target.value)}
            required
            className={styles.input}
          >
            <option value="">선택해 주세요</option>
            {Object.entries(REASONS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <label className={styles.label} htmlFor="reportContent">상세 내용 <span>(선택)</span></label>
          <textarea
            id="reportContent"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={4000}
            rows={7}
            placeholder="신고 내용을 구체적으로 작성해 주세요."
            className={styles.textarea}
            aria-describedby="report-count"
          />
          <p id="report-count" className={styles.count}>{content.length.toLocaleString()} / 4,000자</p>
          <p className={styles.guide}>신고 사유와 관련된 내용을 구체적으로 작성해 주세요.</p>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <button className={styles.submit} type="submit" disabled={!reasonType || submitting}>
            {submitting ? "접수 중..." : "신고 접수"}
          </button>
        </fieldset>
      </form>

      <p className={styles.back}>
        <Link to={returnPath}>{isFeed || isUser ? "피드 목록으로 돌아가기" : "상품으로 돌아가기"}</Link>
      </p>
    </section>
  );
}

