import { expect, test } from "vitest";
import { initGame, reducer } from "./game";

const select = (s, ...cards) => cards.reduce((st, c) => reducer(st, { type: "select", id: c.id }), s);
const shownIds = (s) => s.cards.filter((c) => c.selected).map((c) => c.id).sort();
const setup = () => {
  const s = initGame();
  const [a] = s.cards;
  const twin = s.cards.find((c) => c.value === a.value && c.id !== a.id);
  const others = s.cards.filter((c) => c.value !== a.value);
  return { s, a, twin, others };
};

test("mismatched pair is hidden, matched pair stays", () => {
  const { s, a, twin, others } = setup();
  expect(s.cards).toHaveLength(12);

  const missed = reducer(select(s, a, others[0]), { type: "hide" });
  expect(shownIds(missed)).toEqual([]);

  const matched = reducer(select(missed, a, twin), { type: "hide" });
  expect(shownIds(matched)).toEqual([a.id, twin.id].sort());
});

test("clicks are ignored while a mismatched pair is shown", () => {
  const { s, a, others } = setup();
  const [b, c] = others;

  const pending = select(s, a, b);
  expect(select(pending, c)).toBe(pending);
  expect(shownIds(reducer(pending, { type: "hide" }))).toEqual([]);
});
