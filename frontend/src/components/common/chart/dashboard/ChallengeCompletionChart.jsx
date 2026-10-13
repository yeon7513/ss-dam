import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const options = {
  responsive: false,
  maintainAspectRatio: false,
  cutout: '83%',       // 가운데 빈 공간 크기
  rotation: 225,       // 왼쪽 아래에서 시작
  circumference: 270, // 전체 원의 270도만 표시
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.raw}%`,
      },
    },
  },
};

export default function ChallengeCompletionChart({ rate }) {
  const data = {
    labels: ['달성', '미달성'],
    datasets: [
      {
        data: [rate, 100 - rate],
        backgroundColor: ['#047500', '#dfe3e9'],
        borderWidth: 0,
        borderRadius: 20,
        spacing: 0,
      },
    ],
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '180px',
        width: '180px',
        margin: '0 auto',
      }}
    >
     <Doughnut
        data={data}
        options={options}
        width={180}
        height={180}
      />

      {/* 차트 아래쪽 빈 공간에 달성률 표시 */}
      <span
        style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          fontWeight: 700,
          color: '#6c757d',
          pointerEvents: 'none',
        }}
      >
        {rate}%
      </span>
    </div>
  );
}
