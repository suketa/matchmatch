const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const initGame = (pairs = 6) => {
  const faces = [...Array(pairs).keys()].map((i) => String.fromCodePoint(0x1f347 + i));
  return {
    cards: shuffle([...faces, ...faces]).map((value, id) => ({ id, value, selected: false })),
    preSelected: null,
    reverse: [],
  };
};

const setSelected = (cards, ids, selected) =>
  cards.map((c) => (ids.includes(c.id) ? { ...c, selected } : c));

export const reducer = (state, action) => {
  switch (action.type) {
    case "select": {
      const { preSelected } = state;
      const card = state.cards[action.id];
      if (card.selected || state.reverse.length) return state;
      return {
        cards: setSelected(state.cards, [card.id], true),
        preSelected: preSelected ? null : card,
        reverse: preSelected && preSelected.value !== card.value ? [preSelected.id, card.id] : [],
      };
    }
    case "hide":
      return { ...state, cards: setSelected(state.cards, state.reverse, false), reverse: [] };
    default:
      return state;
  }
};
