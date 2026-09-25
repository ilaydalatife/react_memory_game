import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import GamePage
  from "@/pages/GamePage";

import HomePage
  from "@/pages/HomePage";


function App() {
  return (
    <Routes>

      <Route
        path="/"

        element={
          <HomePage />
        }
      />


      <Route
        path="/game/:difficulty"

        element={
          <GamePage />
        }
      />


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