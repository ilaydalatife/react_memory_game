import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import GamePage from "@/pages/GamePage";
import HomePage from "@/pages/HomePage";


function App() {
  return (
    <Routes>

      {/* Ana sayfa */}
      <Route
        path="/"
        element={
          <HomePage />
        }
      />


      {/*
        Dinamik oyun route'u.

        Örnek:

        /game/easy
        /game/medium
        /game/hard
      */}
      <Route
        path="/game/:difficulty"
        element={
          <GamePage />
        }
      />


      {/*
        Tanımlanmayan route varsa
        ana sayfaya dön.
      */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}


export default App;