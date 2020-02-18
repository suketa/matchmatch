import { SELECT_CARD, MATCHE_CARD, HIDE_CARD } from "../actions/CardsType";

const shuffle = l => {
  const len = l.length;
  let indices = [...Array(len).keys()];
  let a = [];
  for (let k = 0, n = len; k < len; k++, n--) {
    let j = Math.floor(Math.random() * n);
    a[k] = l[indices[j]];
    indices = indices.filter(e => e !== indices[j]);
  }
  return a;
};

const cards = n => {
  const m = Math.floor(n / 2);
  const card = [...Array(m).keys()].map(e => String.fromCodePoint(0x1f347 + e));
  return shuffle([...card, ...card]);
};

const shuffleCards = () => {
  return cards(12).map((e, idx) => ({
    id: idx,
    value: e,
    selected: false,
    matched: false
  }));
};

const initStatus = () => {
  return {
    cards: shuffleCards(),
    reverse: []
  };
};

const CardsReducers = (state = initStatus(), action) => {
  const { cards } = state;
  switch (action.type) {
    case SELECT_CARD:
      return {
        ...state,
        cards: cards.map(card =>
          card.id === action.id ? { ...card, selected: true } : card
        )
      };
    case MATCHE_CARD:
      let pair = cards.find(
        card => card.selected && !card.matched && card.id !== action.id
      );
      if (pair) {
        if (pair.value === action.value) {
          return {
            ...state,
            reverse: [],
            cards: cards.map(card =>
              card.id === action.id || card.id === pair.id
                ? { ...card, matched: true }
                : card
            )
          };
        } else {
          return {
            ...state,
            reverse: [action.id, pair.id]
          };
        }
      }
      return state;
    case HIDE_CARD:
      const new_cards = cards.map(card =>
        state.reverse.includes(card.id)
          ? { ...card, matched: false, selected: false }
          : card
      );
      return {
        ...state,
        cards: new_cards,
        reverse: []
      };
    default:
      return state;
  }
};

export default CardsReducers;
