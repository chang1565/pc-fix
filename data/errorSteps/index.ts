import type { ErrorStepInput } from "./types";
import { errorSteps1 } from "./batch1";
import { errorSteps2 } from "./batch2";

export type { ErrorStepInput } from "./types";
export const errorSteps: Record<string, ErrorStepInput[]> = { ...errorSteps1, ...errorSteps2 };
