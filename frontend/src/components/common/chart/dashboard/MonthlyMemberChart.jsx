// 관리자 대시보드 [차트 영역] - 월간 신규 회원 

/* 역할
* 차트 컴포넌트: 데이터를 props로 받아 차트 그리기
* DashboardCharts.jsx: 차트 배치와 데이터 전달
* ChartCard.jsx: 제목과 카드 외형
 */

// 차트 그리는 방법
// https://velog.io/@treejy/React%EC%97%90%EC%84%9C-Chart.js-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-with-TypeScript

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

// 표시 설정은 기존처럼 컴포넌트 바깥에 유지
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
    },
  },
};

export default function MonthlyMemberChart({
  thisYearCounts = [],
  lastYearCounts = [],
}) {
  // 부모에서 받은 데이터로 차트 구성
  const data = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: '올해',
        data: thisYearCounts,
        borderColor: '#6c757d',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0,
      },
      {
        label: '지난해',
        data: lastYearCounts,
        borderColor: '#cbd0d6',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0,
      },
    ],
  };

  return (
    <div
      style={{ position: 'relative', height: '200px', width: '100%' }}
    >
      <Line data={data} options={options} />
    </div>
  );
}