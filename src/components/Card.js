import React from "react";
import { useDispatch } from "react-redux";
import { selectCard, matchCard, hideCard } from "../actions/CardsType";
import useAsyncHide from "../asyncactions/useAsyncHide";
import "./Card.css";

export const Card = ({ card }) => {
  const numberClass = card.selected ? "number-shown" : "number-hidden";

  const dispatch = useDispatch();
  const asyncHide = useAsyncHide();

  const handleClick = card => {
    if (!card.matched) {
      dispatch(selectCard(card.id));
      dispatch(matchCard(card.id, card.value));
      asyncHide(hideCard());
    }
  };

  return (
    <div className="card" onClick={() => handleClick(card)}>
      <div className={numberClass}>{card.value}</div>
    </div>
  );
};

export default Card;
