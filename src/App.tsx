import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import MealSearch from "./Pages/MealSearch";
import { Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Reviews from "./Pages/Reviews";

function App(): JSX.Element {
  const [signedInUserID, setSignedInUserID] = useState<number | undefined>();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  return (
    <>
      <h1>chefbook</h1>
      <nav>
        {!signedInUserID && <button>sign in</button>}
        <Link to="/reviews">| reviews</Link>
        <Link to="/meal-search"> | meal search</Link>
        {signedInUserID && <button>sign out</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/meal-search" element={<MealSearch />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route
          path="/meal-search/categories/:category"
          element={<h1>category</h1>}
        />
        <Route
          path="/meal-search/main-ingredient/:ingredient"
          element={<h1>ingredient</h1>}
        />
        <Route
          path="/meal-search/nationality/:country"
          element={<h1>nationality</h1>}
        />
        <Route path="/meal-search/random" element={<h1>random</h1>} />
      </Routes>
    </>
  );
}

export default App;
