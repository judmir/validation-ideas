import { initialState } from "../valstate";
import { ALL_IDEAS, canValidate } from "./index";

/** Serialisable test metadata for client lists (winners + the DinnerList simulated demo). */
export const TESTS = ALL_IDEAS.filter((i) => canValidate(i) && i.validation).map((i) => ({
  id: i.painId,
  initial: initialState(i),
  budgetEur: i.validation!.adKit.budgetEur.max,
}));
