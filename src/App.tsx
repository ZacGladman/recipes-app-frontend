import { NavLink, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import MealSearch from "./Pages/MealSearch";
import { Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Reviews from "./Pages/Reviews";
import Meal from "./utils/interfaces/IMeal";
import RecipeWithParams from "./Pages/RecipeWithParams";
import RecipeRandom from "./Pages/RecipeRandom";
import MealsByCategory from "./Pages/MealsByCategory";
import MealsByNation from "./Pages/MealsByNation";

function App(): JSX.Element {
  const [signedInUserID, setSignedInUserID] = useState<number | undefined>();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  return (
    <>
      <nav className="navbar-upper">
        <p className="page-title">chefbook</p>
        <div className="nav-bar-subtitles">
          {!signedInUserID && <button className="btn-sign-in">sign in</button>}
          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive ? "active-navbar-link" : "navbar-link"
            }
          >
            reviews
          </NavLink>
          <NavLink
            to="/meal-search"
            className={({ isActive }) =>
              isActive ? "active-navbar-link" : "navbar-link"
            }
          >
            meal search
          </NavLink>
          {signedInUserID && <button className="btn-sign-out">sign out</button>}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/meal-search"
          element={
            <MealSearch
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
            />
          }
        />
        <Route path="/reviews" element={<Reviews />} />
        <Route
          path="/meal-search/main-ingredient/:ingredient"
          element={<h1>ingredient</h1>}
        />
        <Route path="/meal-search/:id" element={<RecipeWithParams />} />
        <Route
          path="/meal-search/random"
          element={<RecipeRandom meal={selectedMeal} />}
        />
        <Route
          path="/meal-search/categories/:cat"
          element={<MealsByCategory />}
        />
        <Route
          path="/meal-search/nationality/:nation"
          element={<MealsByNation />}
        />
      </Routes>
    </>
  );
}

export default App;
