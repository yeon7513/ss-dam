import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function useMarketManageDetail() {
  const { code: prodCode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");

  const sessionUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  const admCode = sessionUser?.admCode;

  useEffect(() => {
    fetchProduct();
  }, [prodCode]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/products/${prodCode}`);

      if (!response.ok)
        throw new Error(`데이터 로딩 실패 (HTTP ${response.status})`);

      const result = await response.json();

      if (result.success) {
        setProduct(result.data);
      } else {
        alert(result.message || "상품 조회에 실패했습니다");
      }
    } catch (err) {
      console.error("상품 조회중 에러", err);
    } finally {
      setLoading(false);
    }
  };

  const handelAction = async (type) => {
    if (!reason.trim()) return alert("처리 사유를 입력하세요");
    if (!admCode) return alert("접근 권한이 없습니다");

    const isRestore = type === "RESTORE";
    const confirmMsg = isRestore
      ? "상품을 활성화하시겠습니까?"
      : "상품을 비활성화하시겠습니까?";

    if (!window.confirm(confirmMsg)) return;

    const url = isRestore
      ? `/api/admin/products/${prodCode}/restore?admCode=${admCode}`
      : `/api/admin/products/${prodCode}?admCode=${admCode}`;

    const method = isRestore ? "PATCH" : "DELETE";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok)
        throw new Error(`처리에 실패했습니다 (HTTP ${response.status})`);

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setReason("");
        fetchProduct();
      } else {
        alert(result.message || "처리에  실패했습니다");
      }
    } catch (err) {
      console.error("상태 변경 중 에러", err);
    }
  };

  const infoData = product
    ? [
        { label: "상품명", value: product.title, isBold: true },
        { label: "작성자 ID", value: product.mId || product.m_id || "-" },
        {
          label: "판매 가격",
          value: `${product.price?.toLocaleString() ?? 0}원`,
        },
        { label: "거래 상태", value: product.dealStatus || "-" },
        {
          label: "조회수",
          value: `${product.hitcount?.toLocaleString() || 0}회`,
        },
        {
          label: "상품 신고 수",
          value: `${product.contProductReport ?? 0}건`,
          isDanger: true,
        },
      ]
    : [];

  return {
    product,
    loading,
    reason,
    setReason,
    navigate,
    handleDelete: () => handelAction("DELETE"),
    handleRestore: () => handelAction("RESTORE"),
    infoData,
  };
}
