import React from "react";
import { useSelector } from "react-redux"
import Card from "./Card"
import "./GameBoard.css"

export const GameBoard = () => {
  const cards = useSelector(state => state.CardsReducers.cards)

  return (
    <div>
      <h1>matchmatch</h1>
      <div className="board">
        {cards.map(e => (
          <Card card={e} key={e.id} />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
