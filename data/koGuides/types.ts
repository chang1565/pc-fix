// 한국어 페이지 전용 직접 작성 안내.
// 기존 problems.ts·errorCodes.ts는 번역 사전의 원문 키이므로 그대로 두고, 한국어 화면에서만 이 내용으로 대체한다.
export type GuideStep = {
  title: string;
  reason: string;
  difficulty: "쉬움" | "보통" | "어려움";
  time: string;
  cost?: string;
  steps: string[];
  checkPoint: string;
};

export type KoGuide = {
  /** 내용을 직접 검토·수정한 날짜(YYYY-MM-DD). */
  reviewedAt: string;
  /** 이 증상·오류에만 해당하는 2~3문장 소개. */
  description: string;
  /** 해결을 시작하기 전에 상황을 나누는 질문·확인 2~4개. */
  quickCheck: string[];
  causes: string[];
  solutions: GuideStep[];
  faqs: { question: string; answer: string }[];
  warning?: string;
  /** 내용을 실제로 확인한 공식 문서만 넣는다. */
  sources: { title: string; url: string }[];
};
