import { useCallback, useEffect, useState } from "react";
import Meal from "../utils/interfaces/IMeal";
import FullRecipe from "../components/FullRecipe";
import RecipeNoUserSignedIn from "../components/RecipeNoSignedInUser";

interface RandomRecipeProps {
  meal: Meal | null;
  signedInUserID: string | null | undefined;
}

export default function RecipeRandom(props: RandomRecipeProps): JSX.Element {
  const [meal, setMeal] = useState(props.meal);

  const fetchRandomMeal = useCallback(async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const randomMeal: { meals: Meal[] } = await response.json();
    setMeal(randomMeal.meals[0]);
  }, [setMeal]);

  useEffect(() => {
    if (meal === null) {
      fetchRandomMeal();
    }
  }, [meal, fetchRandomMeal]);

  return (
    <div className="ctn-random-recipe">
      <button className="btn-new-random-meal" onClick={() => fetchRandomMeal()}>
        new random meal
      </button>
      {props.signedInUserID ? (
        <FullRecipe meal={meal} />
      ) : (
        <RecipeNoUserSignedIn meal={meal} />
      )}
    </div>
  );
}
