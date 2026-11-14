// 단계별 예상 시간 문자열("10~30분", "30분~1시간", "15-40 minutes", "10～30分" 등)을 합산해 점검 순서표 아래에 보여준다.
const HOUR = /^\s*(?:시간|hours?|hrs?|時間|小时)/i;
const MINUTE = /^\s*(?:분|min|分)/i;

export function range(time: string): [number, number] {
  const values = [...time.matchAll(/\d+/g)].map((m) => {
    const after = time.slice((m.index ?? 0) + m[0].length);
    return { value: Number(m[0]), unit: HOUR.test(after) ? 60 : MINUTE.test(after) ? 1 : 0 };
  });
  if (values.length === 0) return [0, 0];
  // "10~30분", "1~2시간"처럼 앞 숫자에 단위가 없으면 뒤 숫자의 단위를 따른다.
  for (let i = values.length - 1; i >= 0; i -= 1) {
    if (values[i].unit === 0) values[i].unit = values[i + 1]?.unit || 1;
  }
  const minutes = values.map((v) => v.value * v.unit);
  return [minutes[0], minutes[minutes.length - 1]];
}

const UNITS: Record<string, { h: (n: number) => string; m: (n: number) => string; join: string; dash: string }> = {
  ko: { h: (n) => `${n}시간`, m: (n) => `${n}분`, join: " ", dash: "~" },
  en: { h: (n) => `${n} hr`, m: (n) => `${n} min`, join: " ", dash: "–" },
  ja: { h: (n) => `${n}時間`, m: (n) => `${n}分`, join: "", dash: "～" },
  "zh-CN": { h: (n) => `${n}小时`, m: (n) => `${n}分钟`, join: "", dash: "~" },
};

function format(minutes: number, locale: string): string {
  const u = UNITS[locale] ?? UNITS.en;
  if (minutes < 60) return u.m(minutes);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${u.h(h)}${u.join}${u.m(m)}` : u.h(h);
}

export function totalTime(solutions: { time: string }[], locale: string): string {
  let lo = 0;
  let hi = 0;
  for (const s of solutions) {
    const [a, b] = range(s.time);
    lo += a;
    hi += b;
  }
  if (hi === 0) return "";
  const u = UNITS[locale] ?? UNITS.en;
  return lo === hi ? format(lo, locale) : `${format(lo, locale)}${u.dash}${format(hi, locale)}`;
}
