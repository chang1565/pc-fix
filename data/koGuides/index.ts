import type { KoGuide } from "./types";
import { batch1Problems, batch1Errors } from "./batch1";
import { batch2Problems } from "./batch2";
import { batch3Problems } from "./batch3";
import { batch4Problems } from "./batch4";

export type { KoGuide, GuideStep } from "./types";

export const koProblemGuides: Record<string, KoGuide> = {
  ...batch1Problems,
  ...batch2Problems,
  ...batch3Problems,
  ...batch4Problems,
};

export const koErrorGuides: Record<string, KoGuide> = {
  ...batch1Errors,
};
