import type { KoGuide } from "./types";
import { batch1Problems, batch1Errors } from "./batch1";
import { batch2Problems } from "./batch2";
import { batch3Problems } from "./batch3";
import { batch4Problems } from "./batch4";
import { batch5Problems } from "./batch5";
import { batch6Problems } from "./batch6";
import { batch7Problems } from "./batch7";
import { batch8Problems } from "./batch8";
import { batch9Problems } from "./batch9";
import { batch10Problems } from "./batch10";
import { batch11Problems } from "./batch11";
import { batch12Problems } from "./batch12";
import { batch13Problems } from "./batch13";
import { batch14Problems } from "./batch14";
import { batch15Errors } from "./batch15";
import { batch16Errors } from "./batch16";
import { batch17Errors } from "./batch17";
import { batch18Errors } from "./batch18";

export type { KoGuide, GuideStep } from "./types";

export const koProblemGuides: Record<string, KoGuide> = {
  ...batch1Problems,
  ...batch2Problems,
  ...batch3Problems,
  ...batch4Problems,
  ...batch5Problems,
  ...batch6Problems,
  ...batch7Problems,
  ...batch8Problems,
  ...batch9Problems,
  ...batch10Problems,
  ...batch11Problems,
  ...batch12Problems,
  ...batch13Problems,
  ...batch14Problems,
};

export const koErrorGuides: Record<string, KoGuide> = {
  ...batch1Errors,
  ...batch15Errors,
  ...batch16Errors,
  ...batch17Errors,
  ...batch18Errors,
};
