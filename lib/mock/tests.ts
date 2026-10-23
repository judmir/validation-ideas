import { initialState } from "../valstate";
import { TOP_PICKS } from "./index";

/** Serialisable test metadata for client lists: initial state + total budget. */
export const TESTS = TOP_PICKS.map((i) => ({
  id: i.id, name: i.name, night: i.night,
  initial: initialState(i),
  budgetEur: i.validation!.adKit.budget.dailyEur * i.validation!.adKit.budget.days,
})).sort((a, b) => b.night.localeCompare(a.night));
