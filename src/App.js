import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css";
import GameBoard from "./components/GameBoard";
import rootReducers from "./reducers";

function App() {
  const store = createStore(rootReducers);

  return (
    <div>
      <Provider store={store}>
        <GameBoard />
      </Provider>
    </div>
  );
}

export default App;
