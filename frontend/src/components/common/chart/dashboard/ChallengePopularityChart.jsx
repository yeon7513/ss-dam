import 'chart.js/auto';
import { PolarArea } from 'react-chartjs-2';


// 0%는 밝게, 100%는 진하게
function getProgressColor(rate) {
  const progress = Math.min(100, Math.max(0, rate));
  const lightness = 90 - (progress / 100) * 50;

  return `hsl(215, 10%, ${lightness}%)`;
}

export default function ChallengePopularityChart({ challenges = [] }) {
  // 서버에서 진행 중인 챌린지만 골라 TOP 5로 전달
  if (challenges.length === 0) {
    return <p>진행 중인 챌린지가 없습니다.</p>;
  }

  const data = {
    labels: challenges.map((item) => item.title),
    datasets: [
      {
        label: '참여 인원',
        data: challenges.map((item) => item.participantCount),
        backgroundColor: challenges.map((item) =>
          getProgressColor(item.averageProgressRate),
        ),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        // 전부 0명이면 축 범위 확보
        suggestedMax: Math.max(
          1,
          ...challenges.map((item) => item.participantCount),
        ),
        grid: {
          color: '#cbd1d8',
        },
        angleLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
        pointLabels: {
          display: false,
        },
      },
    },
    plugins: {
      // 기본 범례는 챌린지별 색상 목록이므로 숨김
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (items) =>
            items.length ? challenges[items[0].dataIndex].title : '',
          label: (context) => {
            const item = challenges[context.dataIndex];

            return [
              `참여 인원: ${item.participantCount.toLocaleString()}명`,
              `평균 진행률: ${item.averageProgressRate.toFixed(1)}%`,
              `작성 피드: ${item.proofCount.toLocaleString()}개`,
            ];
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0, minWidth: 0 }}>
        <PolarArea
          data={data}
          options={options}
          role="img"
          aria-label="진행 중인 챌린지 참여 인원 상위 5개"
        />
    </div>
  );
}
