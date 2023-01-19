import { NavLink, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import MealSearch from "./Pages/MealSearch";
import "./App.css";
import { useState } from "react";
import Reviews from "./Pages/Reviews";
import Meal from "./utils/interfaces/IMeal";
import RecipeWithParams from "./Pages/RecipeWithParams";
import RecipeRandom from "./Pages/RecipeRandom";
import MealsByCategory from "./Pages/MealsByCategory";
import MealsByNation from "./Pages/MealsByNation";
import { auth, googleAuthProvider } from "./configureFirebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { baseURL } from ".";

function App(): JSX.Element {
  const [signedInUserID, setSignedInUserID] = useState<string | null>();
  const [signedInUserImg, setSignedInUserImg] = useState<string | null>();
  const [signedInUserName, setSignedInUserName] = useState<string | null>();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [navSelection, setNavSelection] = useState<string>("dish-name");

  const handleSignInClicked = async () => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    const signedInUser = userCredential.user;
    console.log(signedInUser);
    setSignedInUserID(signedInUser.email);
    setSignedInUserImg(signedInUser.photoURL);
    setSignedInUserName(signedInUser.displayName);
    const postBody = {
      username: signedInUser.displayName,
      userEmail: signedInUser.email,
      profilePic: signedInUser.photoURL,
    };
    await axios.post(`${baseURL}/users`, postBody);
  };

  const handleSignOutClicked = async () => {
    await auth.signOut();
    setSignedInUserID(null);
    setSignedInUserImg(null);
    setSignedInUserName(null);
  };
  return (
    <>
      <nav className="navbar-upper">
        <p className="page-title">chefbook</p>
        <div className="nav-bar-subtitles">
          {!signedInUserID && (
            <button className="btn-sign-in" onClick={handleSignInClicked}>
              sign in
            </button>
          )}
          <div className="nav-user-details">
            {signedInUserImg && (
              <img
                src={signedInUserImg}
                alt="profile pic"
                className="navbar-user-profile-pic"
              />
            )}
            {signedInUserName && (
              <p className="navbar-username">{signedInUserName}</p>
            )}
          </div>
          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive ? "active-reviews-link" : "reviews-link"
            }
          >
            reviews
          </NavLink>
          <NavLink
            to="/meal-search"
            className={({ isActive }) =>
              isActive ? "active-mealsearch-link" : "mealsearch-link"
            }
            onClick={() => setNavSelection("dish-name")}
          >
            meal search
          </NavLink>
          {signedInUserID && (
            <button className="btn-sign-out" onClick={handleSignOutClicked}>
              sign out
            </button>
          )}
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
              navSelection={navSelection}
              setNavSelection={setNavSelection}
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
          element={<MealsByCategory setNavSelection={setNavSelection} />}
        />
        <Route
          path="/meal-search/nationality/:nation"
          element={<MealsByNation setNavSelection={setNavSelection} />}
        />
      </Routes>
    </>
  );
}

export default App;
