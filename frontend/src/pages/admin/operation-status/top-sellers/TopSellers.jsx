import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

import Card from '../../../../components/common/card/Card.jsx';
import styles from './TopSellers.module.scss';

const COLORS = [
  '#676f77',
  '#888f98',
  '#a3aab2',
  '#c1c7ce',
  '#dde1e7',
];

const formatMoney = (amount) => `${amount.toLocaleString('ko-KR')}원`;

function calculateChangeRate(current, previous) {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

function formatChangeRate(rate) {
  if (rate == null) return '비교 실적 없음';

  const rounded = Math.round(rate * 10) / 10;
  return `${rounded > 0 ? '+' : ''}${rounded.toFixed(1)}%`;
}

export default function TopSellers({ topSellersData = [] }) {
  const sellers = [...topSellersData]
    .filter((seller) => seller.salesAmount > 0)
    .sort(
      (a, b) =>
        b.salesAmount - a.salesAmount ||
        a.sellerId.localeCompare(b.sellerId),
    )
    .slice(0, 5);

  const data = {
    labels: sellers.map((seller) => seller.sellerName),
    datasets: [
      {
        label: '이번 달',
        data: sellers.map((seller) => seller.salesAmount),
        backgroundColor: COLORS.slice(0, sellers.length),
        borderColor: '#ffffff',
        borderWidth: 1,
        hoverOffset: 4,
      },
      {
        label: '전월 동기간',
        data: sellers.map((seller) => seller.previousSalesAmount),
        backgroundColor: COLORS.slice(0, sellers.length),
        borderColor: '#ffffff',
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '48%',
    layout: {
      padding: 6,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const seller = sellers[context.dataIndex];
            const amount = context.raw;
            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
            const share = total > 0 ? (amount / total) * 100 : 0;

            return [
              `${seller.sellerName} · ${context.dataset.label}`,
              `판매 금액: ${formatMoney(amount)}`,
              `선정된 5명 내 비중: ${share.toFixed(1)}%`,
            ];
          },
        },
      },
    },
  };

  return (
    <Card className={styles.bottomCard}>
      <div className={styles.cardHeader}>
        <h3>우수 판매자</h3>
        <span>이번 달 · 거래 완료 금액 TOP 5</span>
      </div>

      {sellers.length === 0 ? (
        <p className={styles.empty}>판매 실적이 없습니다.</p>
      ) : (
        <div className={styles.sellerFlex}>
          <div className={styles.donutWrap}>
            <Doughnut
              data={data}
              options={options}
              role="img"
              aria-label="우수 판매자 5명의 판매 금액 비중. 바깥 원은 이번 달, 안쪽 원은 전월 동기간"
            />

          </div>

          <div className={styles.listWrap}>
            <ul className={styles.sellerList}>
              {sellers.map((seller, index) => {
                const rate = calculateChangeRate(
                  seller.salesAmount,
                  seller.previousSalesAmount,
                );

                const rateClass =
                  rate == null || rate === 0
                    ? styles.neutral
                    : rate > 0
                      ? styles.plus
                      : styles.minus;

                return (
                  <li key={seller.sellerId}>
                    <span
                      className={styles.sellerName}
                      title={seller.sellerName}
                    >
                      <i
                        className={styles.dot}
                        style={{ backgroundColor: COLORS[index] }}
                        aria-hidden="true"
                      />
                      <span>{seller.sellerName}</span>
                    </span>

                    <strong className={styles.amount}>
                      {formatMoney(seller.salesAmount)}
                    </strong>

                    <span className={`${styles.badge} ${rateClass}`}>
                      {formatChangeRate(rate)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {sellers.length > 0 && (
        <p className={styles.comparisonLabel}>
          바깥: 이번 달 · 안쪽: 전월 동기간 · 증감률: 전월 동기간 대비
        </p>
      )}
    </Card>
  );
}
