// 오류 코드 페이지별로 직접 쓴 해결 단계. 있으면 공통 2단계(발생 조건 확인·해결 절차) 대신 쓴다(모든 언어 공통 원문).
export type ErrorStepInput = {
  title: string;
  reason: string;
  difficulty: "쉬움" | "보통" | "어려움";
  time: string;
  steps: string[];
  checkPoint?: string;
};
