import React from 'react'
import { useDispatch } from 'react-redux'
import { selectCard, matchCard } from '../actions/CardsType'
import './Card.css'

export const CardF = ({ card }) => {
  const numberClass = card.selected ? "number-shown" : "number-hidden";

  const dispatch = useDispatch()

  const handleClick = (id, value) => {
    dispatch(selectCard(id))
    dispatch(matchCard(id, value))
  }

  return (
    <div className="card" onClick={() => handleClick(card.id, card.value)}>
      <div className={numberClass}>{card.value}</div>
    </div>
  );
}

const Card = props => {
  const handleClicked = () => {
    props.handler(props.card);
  };
  const numberClass = props.card.selected ? "number-shown" : "number-hidden";

  return (
    <div className="card" onClick={handleClicked}>
      <div className={numberClass}>{props.card.value}</div>
    </div>
  );
};

export default Card

