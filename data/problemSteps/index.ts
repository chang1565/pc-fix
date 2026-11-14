import type { StepInput } from "./types";
import { steps1 } from "./batch1";
import { steps2 } from "./batch2";
import { steps3 } from "./batch3";
import { steps4 } from "./batch4";
import { steps5 } from "./batch5";
import { steps6 } from "./batch6";
import { steps7 } from "./batch7";
import { steps8 } from "./batch8";
import { steps9 } from "./batch9";
import { steps10 } from "./batch10";

export type { StepInput } from "./types";
export const problemSteps: Record<string, StepInput[]> = { ...steps1, ...steps2, ...steps3, ...steps4, ...steps5, ...steps6, ...steps7, ...steps8, ...steps9, ...steps10 };
