import { StrictMode, useEffect, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { initGame, reducer } from "./game";
import "./index.css";

const App = () => {
  const [{ cards, reverse }, dispatch] = useReducer(reducer, undefined, initGame);

  useEffect(() => {
    if (!reverse.length) return;
    const t = setTimeout(() => dispatch({ type: "hide" }), 500);
    return () => clearTimeout(t);
  }, [reverse]);

  return (
    <>
      <h1>Memory</h1>
      <div className="board">
        {cards.map((card) => (
          <button
            key={card.id}
            className="card"
            aria-label={card.selected ? card.value : "hidden card"}
            onClick={() => dispatch({ type: "select", id: card.id })}
          >
            <span className={card.selected ? "" : "hidden"}>{card.value}</span>
          </button>
        ))}
      </div>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
