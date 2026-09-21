import { INFO_COLUMNS } from "./MarketManage.constants";
import DataTable from "../../../components/common/data-table/DataTable";
import { useMarketManageDetail } from "./useMarketManageDetail";
import styles from "./MarketManageDetail.module.scss";
import ImageBox from "./../../../components/common/image-box/ImageBox";

export default function MarketManageDetail() {
  const {
    product,
    reason,
    setReason,
    handleDelete,
    handleRestore,
    infoData,
    navigate,
  } = useMarketManageDetail();

  if (!product)
    return (
      <div className={styles["admin-detail-loading"]}>
        존재하지 않는 상품입니다
      </div>
    );

  return (
    <div className={styles["admin-detail-wrapper"]}>
      {/* 헤더 */}
      <div className={styles["detail-header"]}>
        <h2>
          상품 상세 관리{" "}
          <span className={styles["code-tag"]}>CODE #{product.code}</span>
        </h2>
        <button className={styles["btn-back"]} onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
      </div>

      {/* 상단 요약 바 */}
      <div className={styles["summary-bar"]}>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>작성자 ID</span>
          <span className={styles.value}>
            {product.mId || product.m_id || "-"}
          </span>
        </div>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>노출 상태</span>
          <span
            className={`${styles["status-badge"]} ${styles[`status-${product.status?.toLowerCase()}`]}`}
          >
            {product.status}
          </span>
        </div>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>활성화 여부</span>
          <span
            className={`${styles["active-badge"]} ${
              product.deleteYn === "0" ? styles.active : styles.inactive
            }`}
          >
            {product.deleteYn === "0" ? "활성화" : "비활성화(삭제)"}
          </span>
        </div>
        <div className={styles["summary-item"]}>
          <span className={styles.label}>등록일</span>
          <span className={styles.value}>{product.createdAt}</span>
        </div>
      </div>

      {/* 본문 2단 그리드 */}
      <div className={styles["detail-grid"]}>
        <div className={styles["left-content"]}>
          <div className={styles.card}>
            <h3 className={styles["card-title"]}>상품 정보</h3>
            <DataTable columns={INFO_COLUMNS} data={infoData} />
          </div>

          <div className={styles.card}>
            <h3 className={styles["card-title"]}>상품 설명 본문</h3>
            <div className={styles["content-box"]}>
              {product.content || "등록된 상세 설명 내용이 없습니다."}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles["card-title"]}>상품 이미지 목록</h3>
            <div className={styles["image-gallery"]}>
              {product.imagePaths?.length > 0 ? (
                product.imagePaths.map((path, idx) => (
                  <div key={idx} className={styles["image-item"]}>
                    <ImageBox src={path} alt={`product-img-${idx}`} />
                  </div>
                ))
              ) : (
                <p className={styles["no-data"]}>등록된 이미지가 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles["right-content"]}>
          <div className={`${styles.card} ${styles["action-card"]}`}>
            <h3 className={styles["card-title"]}>관리자 상태 조치</h3>
            <p className={styles["action-desc"]}>
              삭제 또는 복구 사유를 입력한 뒤 변경 버튼을 누르세요.
            </p>
            <textarea
              className={styles["reason-textarea"]}
              placeholder="처리 사유를 입력하세요..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className={styles["button-group"]}>
              <button
                className={`${styles["btn-action"]} ${styles["btn-delete"]}`}
                onClick={handleDelete}
              >
                비활성화 (삭제)
              </button>
              <button
                className={`${styles["btn-action"]} ${styles["btn-restore"]}`}
                onClick={handleRestore}
              >
                활성화 (복구)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
