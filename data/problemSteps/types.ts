// 증상 페이지별로 직접 쓴 해결 단계. 있으면 preset 공통 단계 대신 쓴다(모든 언어 공통 원문).
export type StepInput = {
  title: string;
  reason: string;
  difficulty: "쉬움" | "보통" | "어려움";
  time: string;
  cost: string;
  steps: string[];
  checkPoint?: string;
};
