import React from 'react'
import { useDispatch } from 'react-redux'
import { selectCard, matchCard, hideCard } from '../actions/CardsType'
import useAsyncHide from '../asyncactions/useAsyncHide'
import './Card.css'

export const Card = ({ card }) => {
  const numberClass = card.selected ? "number-shown" : "number-hidden";

  const dispatch = useDispatch()
  const asyncHide = useAsyncHide();

  const handleClick = (id, value) => {
    dispatch(selectCard(id))
    dispatch(matchCard(id, value))
    asyncHide(hideCard())
  }

  return (
    <div className="card" onClick={() => handleClick(card.id, card.value)}>
      <div className={numberClass}>{card.value}</div>
    </div>
  );
}

export default Card
