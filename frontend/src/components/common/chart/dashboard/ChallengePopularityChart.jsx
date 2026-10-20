import 'chart.js/auto';
import { PolarArea } from 'react-chartjs-2';
import { getChallengeProgressColor } from '../../../../utils/getChallengeProgressColor.js';

export default function ChallengePopularityChart({ challenges = [], mode = 'admin' }) {
  const isPersonal = mode === 'personal';
  // 관리자는 진행 중 TOP 5, 개인용은 최근 참여 최대 5개를 서버에서 전달
  if (challenges.length === 0) {
    return <p>{isPersonal ? '참여한 챌린지가 없습니다.' : '진행 중인 챌린지가 없습니다.'}</p>;
  }

  const items = challenges.map((item) => ({
    ...item,
    participantCount: Math.max(0, Number(item.participantCount) || 0),
    proofCount: Math.max(0, Number(item.proofCount) || 0),
    averageProgressRate: Number(item.averageProgressRate) || 0,
    achievementRate: Math.min(100, Math.max(0, Number(item.achievementRate) || 0)),
  }));

  // 개인용은 같은 각도의 부채꼴 면적이 피드 수에 비례하도록 반지름 보정
  const values = items.map((item) =>
    isPersonal ? Math.sqrt(item.proofCount) : item.participantCount,
  );

  const data = {
    labels: items.map((item) => item.title),
    datasets: [
      {
        label: isPersonal ? '내 인증 피드' : '참여 인원',
        data: values,
        backgroundColor: items.map((item) =>
          getChallengeProgressColor(isPersonal ? item.achievementRate : item.averageProgressRate),
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
        suggestedMax: Math.max(1, ...values),
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
            const item = items[context.dataIndex];

            if (isPersonal) {
              return [
                `달성률: ${item.achievementRate.toFixed(1)}%`,
                `내 인증 피드: ${item.proofCount.toLocaleString()}개`,
              ];
            }

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
          aria-label={isPersonal
            ? '최근 참여 챌린지별 내 인증 피드 수와 달성률'
            : '진행 중인 챌린지 참여 인원 상위 5개'}
        />
    </div>
  );
}
