import type { Problem } from "@/data/problems";

/*
 * PC FIX 고속 하이브리드 검색
 *
 * 1단계:
 * - 제목
 * - 카테고리
 * - 키워드
 * - 증상
 * - 설명
 * 을 이용해 빠르게 후보 추출
 *
 * 2단계:
 * - 상위 후보에 대해서만
 * - n-gram
 * - 한글 자모 유사도
 * - 간단한 오타 거리
 * 를 계산
 */

type PreparedProblem = {
  problem: Problem;

  title: string;
  category: string;
  description: string;

  keywords: string[];
  symptoms: string[];
  causes: string[];

  keywordText: string;
  symptomText: string;
  searchText: string;

  tokens: Set<string>;

  charGrams: Set<string>;
  jamoGrams: Set<string>;
};

type ScoredProblem = {
  item: PreparedProblem;
  fastScore: number;
  finalScore: number;
};

/* ----------------------------------
   동의어 / 실제 사용자 표현
---------------------------------- */

const aliasGroups: string[][] = [
  [
    "재부팅",
    "재시작",
    "리부팅",
    "다시켜짐",
    "다시 켜짐",
    "껐다켜짐",
    "꺼졌다켜짐",
    "꺼졌다 켜짐",
  ],

  [
    "꺼짐",
    "종료",
    "전원꺼짐",
    "전원 꺼짐",
    "갑자기꺼짐",
    "갑자기 꺼짐",
  ],

  [
    "검은화면",
    "검은 화면",
    "블랙스크린",
    "블랙 스크린",
    "까만화면",
    "까만 화면",
    "화면검정",
    "화면 검정",
  ],

  [
    "블루스크린",
    "블루 스크린",
    "파란화면",
    "파란 화면",
    "bsod",
  ],

  [
    "튕김",
    "팅김",
    "튕겨요",
    "팅겨요",
    "크래시",
    "crash",
    "강제종료",
    "강제 종료",
  ],

  [
    "느림",
    "느려짐",
    "느려졌어요",
    "버벅임",
    "버벅거림",
    "렉",
    "렉걸림",
    "렉 걸림",
  ],

  [
    "멈춤",
    "프리징",
    "freeze",
    "먹통",
    "굳음",
    "응답없음",
    "응답 없음",
  ],

  [
    "와이파이",
    "wifi",
    "wi-fi",
    "무선인터넷",
    "무선 인터넷",
  ],

  [
    "인터넷",
    "네트워크",
    "랜",
    "이더넷",
    "ethernet",
  ],

  [
    "usb",
    "유에스비",
    "유에스비",
  ],

  [
    "ssd",
    "스스디",
    "에스에스디",
    "nvme",
  ],

  [
    "hdd",
    "하드",
    "하드디스크",
    "하드 디스크",
  ],

  [
    "그래픽카드",
    "그래픽 카드",
    "그래픽가드",
    "gpu",
    "글카",
  ],

  [
    "모니터",
    "화면",
    "디스플레이",
    "display",
  ],

  [
    "인식안됨",
    "인식 안됨",
    "안잡힘",
    "안 잡힘",
    "못찾음",
    "못 찾음",
    "감지안됨",
    "감지 안됨",
  ],

  [
    "부팅",
    "부팅안됨",
    "부팅 안됨",
    "윈도우안켜짐",
    "윈도우 안켜짐",
  ],

  [
    "소리안남",
    "소리 안남",
    "소리가안남",
    "소리가 안남",
    "음소거",
    "오디오안됨",
    "오디오 안됨",
  ],

  [
    "마이크",
    "mic",
    "microphone",
  ],

  [
    "블루투스",
    "bluetooth",
    "bt",
  ],

  [
    "발열",
    "과열",
    "뜨거움",
    "뜨거워요",
    "온도높음",
    "온도 높음",
  ],

  [
    "팬",
    "쿨러",
    "fan",
  ],

  [
    "배터리",
    "battery",
  ],

  [
    "충전",
    "충전안됨",
    "충전 안됨",
    "충전불가",
    "충전 불가",
  ],

  [
    "게임",
    "겜",
    "롤",
    "리그오브레전드",
    "발로란트",
    "배그",
    "배틀그라운드",
    "오버워치",
    "스팀",
  ],

  [
    "드라이버",
    "driver",
  ],

  [
    "업데이트",
    "업뎃",
    "update",
  ],

  [
    "컴퓨터",
    "컴터",
    "컴",
    "pc",
  ],
];

/* ----------------------------------
   기본 정규화
---------------------------------- */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?~"'`(){}\[\]/\\|:;<>+=_*^%$#@]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/*
 * 검색 비교용:
 * 띄어쓰기 차이를 줄이기 위해 별도로 붙인 문자열도 사용
 */
function compact(text: string): string {
  return normalize(text).replace(/\s+/g, "");
}

/* ----------------------------------
   검색어 토큰
---------------------------------- */

function tokenize(text: string): string[] {
  const normalized = normalize(text);

  if (!normalized) {
    return [];
  }

  const words = normalized
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 0);

  return Array.from(new Set(words));
}

/* ----------------------------------
   동의어 확장

   전부 무작정 넣는 것이 아니라
   사용자 검색문에 등장한 그룹만 확장
---------------------------------- */

function expandTokens(query: string): string[] {
  const normalized = normalize(query);
  const compactQuery = compact(query);

  const result = new Set(tokenize(query));

  for (const group of aliasGroups) {
    const matched = group.some((word) => {
      const n = normalize(word);
      const c = compact(word);

      return (
        normalized.includes(n) ||
        compactQuery.includes(c)
      );
    });

    if (!matched) {
      continue;
    }

    for (const word of group) {
      const n = normalize(word);

      if (n) {
        result.add(n);
      }
    }
  }

  return Array.from(result);
}

/* ----------------------------------
   n-gram
---------------------------------- */

function createNGrams(
  text: string,
  size = 2
): Set<string> {
  const value = compact(text);
  const grams = new Set<string>();

  if (!value) {
    return grams;
  }

  if (value.length <= size) {
    grams.add(value);
    return grams;
  }

  for (let i = 0; i <= value.length - size; i++) {
    grams.add(value.slice(i, i + size));
  }

  return grams;
}

/* ----------------------------------
   한글 자모 변환

   JS Unicode NFD를 사용해서
   한글을 초성/중성/종성 형태로 분리
---------------------------------- */

function toJamo(text: string): string {
  return compact(text)
    .normalize("NFD")
    .replace(/\s+/g, "");
}

/* ----------------------------------
   Set 유사도

   Dice coefficient
---------------------------------- */

function diceSimilarity(
  a: Set<string>,
  b: Set<string>
): number {
  if (a.size === 0 || b.size === 0) {
    return 0;
  }

  let intersection = 0;

  /*
   * 작은 Set을 순회해서 조금이라도 계산량 절약
   */
  const smaller =
    a.size <= b.size ? a : b;

  const larger =
    a.size <= b.size ? b : a;

  for (const value of smaller) {
    if (larger.has(value)) {
      intersection++;
    }
  }

  return (
    (2 * intersection) /
    (a.size + b.size)
  );
}

/* ----------------------------------
   제한형 Levenshtein

   무조건 전체 문자열에 사용하지 않음.
   짧은 단어 + 상위 후보에서만 사용.
---------------------------------- */

function levenshteinLimited(
  a: string,
  b: string,
  limit = 2
): number {
  if (a === b) {
    return 0;
  }

  if (
    Math.abs(a.length - b.length) > limit
  ) {
    return limit + 1;
  }

  if (!a.length) {
    return b.length;
  }

  if (!b.length) {
    return a.length;
  }

  let previous = new Array<number>(
    b.length + 1
  );

  let current = new Array<number>(
    b.length + 1
  );

  for (let j = 0; j <= b.length; j++) {
    previous[j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    current[0] = i;

    let rowMinimum = current[0];

    for (let j = 1; j <= b.length; j++) {
      const substitutionCost =
        a[i - 1] === b[j - 1] ? 0 : 1;

      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] +
          substitutionCost
      );

      rowMinimum = Math.min(
        rowMinimum,
        current[j]
      );
    }

    /*
     * 이미 차이가 너무 크면
     * 나머지 계산 중단
     */
    if (rowMinimum > limit) {
      return limit + 1;
    }

    const temp = previous;
    previous = current;
    current = temp;
  }

  return previous[b.length];
}

/* ----------------------------------
   데이터 전처리 캐시
---------------------------------- */

const problemCache = new WeakMap<
  Problem[],
  PreparedProblem[]
>();

function prepareProblems(
  problems: Problem[]
): PreparedProblem[] {
  const cached = problemCache.get(problems);

  if (cached) {
    return cached;
  }

  const prepared = problems.map(
    (problem): PreparedProblem => {
      const title = normalize(problem.title);
      const category = normalize(
        problem.category
      );
      const description = normalize(
        problem.description
      );

      const keywords =
        problem.keywords.map(normalize);

      const symptoms =
        problem.symptoms.map(normalize);

      const causes =
        problem.causes.map(normalize);

      const keywordText =
        keywords.join(" ");

      const symptomText =
        symptoms.join(" ");

      /*
       * 해결 단계 전체까지 넣으면
       * 검색 문서가 너무 길어져서
       * 속도와 검색 품질 모두 안 좋아질 수 있음.
       *
       * 검색에는 증상 중심 데이터만 사용.
       */
      const searchText = normalize(
        [
          title,
          category,
          description,
          keywordText,
          symptomText,
          causes.join(" "),
        ].join(" ")
      );

      const tokens = new Set(
        tokenize(searchText)
      );

      return {
        problem,

        title,
        category,
        description,

        keywords,
        symptoms,
        causes,

        keywordText,
        symptomText,
        searchText,

        tokens,

        charGrams:
          createNGrams(searchText, 2),

        jamoGrams:
          createNGrams(
            toJamo(searchText),
            2
          ),
      };
    }
  );

  problemCache.set(
    problems,
    prepared
  );

  return prepared;
}

/* ----------------------------------
   1차 초고속 검색
---------------------------------- */

function calculateFastScore(
  item: PreparedProblem,
  query: string,
  queryTokens: string[]
): number {
  let score = 0;

  const normalizedQuery =
    normalize(query);

  const compactQuery =
    compact(query);

  const compactTitle =
    compact(item.title);

  /*
   * 전체 문장 정확/부분 일치
   */
  if (
    item.title === normalizedQuery
  ) {
    score += 100;
  }

  if (
    compactTitle === compactQuery
  ) {
    score += 100;
  }

  if (
    item.title.includes(
      normalizedQuery
    )
  ) {
    score += 45;
  }

  if (
    compactTitle.includes(
      compactQuery
    )
  ) {
    score += 45;
  }

  if (
    item.symptomText.includes(
      normalizedQuery
    )
  ) {
    score += 35;
  }

  if (
    item.keywordText.includes(
      normalizedQuery
    )
  ) {
    score += 35;
  }

  /*
   * 토큰별 빠른 점수
   */
  for (const token of queryTokens) {
    const tokenCompact =
      compact(token);

    if (!tokenCompact) {
      continue;
    }

    if (
      item.title.includes(token)
    ) {
      score += 16;
    }

    if (
      item.category.includes(token)
    ) {
      score += 7;
    }

    if (
      item.keywordText.includes(
        token
      )
    ) {
      score += 13;
    }

    if (
      item.symptomText.includes(
        token
      )
    ) {
      score += 11;
    }

    if (
      item.description.includes(
        token
      )
    ) {
      score += 5;
    }

    if (
      item.searchText.includes(
        token
      )
    ) {
      score += 3;
    }

    /*
     * 정확한 토큰 존재
     */
    if (
      item.tokens.has(token)
    ) {
      score += 5;
    }
  }

  return score;
}

/* ----------------------------------
   오타 점수

   중요한 단어만 비교
---------------------------------- */

function calculateTypoScore(
  queryTokens: string[],
  item: PreparedProblem
): number {
  let score = 0;

  /*
   * 제목 + 키워드만 대상으로 함.
   * symptoms 전체를 돌리면 느려짐.
   */
  const targetWords =
    Array.from(
      new Set([
        ...tokenize(item.title),
        ...item.keywords.flatMap(
          (keyword) =>
            tokenize(keyword)
        ),
      ])
    );

  for (
    const queryWord of queryTokens
  ) {
    /*
     * 너무 짧은 단어에 오타 검색을 하면
     * 오탐이 많이 발생
     */
    if (queryWord.length < 3) {
      continue;
    }

    /*
     * 이미 정확히 존재하면
     * Levenshtein 계산 불필요
     */
    if (
      targetWords.includes(queryWord)
    ) {
      continue;
    }

    for (
      const targetWord of targetWords
    ) {
      if (targetWord.length < 3) {
        continue;
      }

      if (
        Math.abs(
          queryWord.length -
            targetWord.length
        ) > 2
      ) {
        continue;
      }

      const distance =
        levenshteinLimited(
          queryWord,
          targetWord,
          2
        );

      if (distance === 1) {
        score += 8;
        break;
      }

      if (distance === 2) {
        score += 3;
        break;
      }
    }
  }

  return score;
}

/* ----------------------------------
   2차 정밀 검색
---------------------------------- */

function calculateDetailedScore(
  candidate: ScoredProblem,
  query: string,
  queryTokens: string[],
  queryGrams: Set<string>,
  queryJamoGrams: Set<string>
): number {
  const item = candidate.item;

  let score =
    candidate.fastScore;

  /*
   * 일반 문자 유사도
   */
  const charSimilarity =
    diceSimilarity(
      queryGrams,
      item.charGrams
    );

  score +=
    charSimilarity * 35;

  /*
   * 한글 자모 유사도
   *
   * 오타/조사 차이에 조금 더 강함.
   */
  const jamoSimilarity =
    diceSimilarity(
      queryJamoGrams,
      item.jamoGrams
    );

  score +=
    jamoSimilarity * 25;

  /*
   * 오타 보정
   */
  score += calculateTypoScore(
    queryTokens,
    item
  );

  /*
   * 여러 핵심 단어가 동시에
   * 제목/증상에 존재하면 가산점
   */
  let matchedImportantWords = 0;

  for (const token of queryTokens) {
    if (
      token.length < 2
    ) {
      continue;
    }

    if (
      item.title.includes(token) ||
      item.symptomText.includes(token) ||
      item.keywordText.includes(token)
    ) {
      matchedImportantWords++;
    }
  }

  if (
    matchedImportantWords >= 2
  ) {
    score +=
      matchedImportantWords * 5;
  }

  return score;
}

/* ----------------------------------
   최종 검색
---------------------------------- */

export function smartSearchProblems(
  problems: Problem[],
  query: string
): Problem[] {
  const normalizedQuery =
    normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  /*
   * 이미 만들어진 검색 데이터가 있으면
   * 캐시에서 바로 꺼냄
   */
  const prepared =
    prepareProblems(problems);

  /*
   * 사용자의 실제 단어 +
   * 발견된 동의어
   */
  const queryTokens =
    expandTokens(query);

  /*
   * -------------------------------
   * STEP 1
   * 217개 전체 빠른 계산
   * -------------------------------
   */

  const fastResults: ScoredProblem[] =
    [];

  for (const item of prepared) {
    const fastScore =
      calculateFastScore(
        item,
        normalizedQuery,
        queryTokens
      );

    fastResults.push({
      item,
      fastScore,
      finalScore: fastScore,
    });
  }

  fastResults.sort(
    (a, b) =>
      b.fastScore - a.fastScore
  );

  /*
   * 상위 30개만 정밀 검색.
   *
   * 후보 점수가 전부 0이더라도
   * 의미/오타 검색을 위해 30개 유지.
   */
  const candidates =
    fastResults.slice(0, 30);

  /*
   * -------------------------------
   * STEP 2
   * 30개만 정밀 계산
   * -------------------------------
   */

  const queryGrams =
    createNGrams(
      normalizedQuery,
      2
    );

  const queryJamoGrams =
    createNGrams(
      toJamo(normalizedQuery),
      2
    );

  for (const candidate of candidates) {
    candidate.finalScore =
      calculateDetailedScore(
        candidate,
        normalizedQuery,
        queryTokens,
        queryGrams,
        queryJamoGrams
      );
  }

  candidates.sort(
    (a, b) =>
      b.finalScore -
      a.finalScore
  );

  /*
   * 너무 무관한 결과 제거.
   *
   * 단, 오타 검색 때문에
   * 기준을 너무 높게 잡지 않음.
   */
  const usefulResults =
    candidates.filter(
      (candidate) =>
        candidate.finalScore >= 3
    );

  /*
   * 검색 결과 최대 20개.
   * 홈페이지에서는 현재 상위 10개만 보여줌.
   */
  return usefulResults
    .slice(0, 20)
    .map(
      (candidate) =>
        candidate.item.problem
    );
}