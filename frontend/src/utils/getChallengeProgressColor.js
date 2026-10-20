// 0%는 밝게, 100%는 진하게
export function getChallengeProgressColor(rate) {
  const progress = Math.min(100, Math.max(0, Number(rate) || 0));
  const lightness = 90 - (progress / 100) * 50;

  return `hsl(215, 10%, ${lightness}%)`;
}
