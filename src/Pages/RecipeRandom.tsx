import { useCallback, useEffect, useState } from "react";
import Meal from "../utils/interfaces/IMeal";
import FullRecipe from "../components/FullRecipe";
import RecipeNoUserSignedIn from "../components/RecipeNoSignedInUser";

interface RandomRecipeProps {
  meal: Meal | null;
  signedInUserEmail: string | null | undefined;
  signedInUserID: number | null;
}

export default function RecipeRandom(props: RandomRecipeProps): JSX.Element {
  const [meal, setMeal] = useState(props.meal);
  const [fetchedRating, setFetchedRating] = useState<number | null>(null);

  const fetchRandomMeal = useCallback(async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const randomMeal: { meals: Meal[] } = await response.json();
    if (randomMeal.meals[0].idMeal) {
      setMeal(randomMeal.meals[0]);
    }
  }, [setMeal]);

  useEffect(() => {
    if (meal === null) {
      fetchRandomMeal();
    }
  }, [meal, fetchRandomMeal]);

  return (
    <div className="ctn-random-recipe">
      <button
        className="btn-new-random-meal"
        onClick={() => {
          setFetchedRating(null);
          fetchRandomMeal();
        }}
      >
        new random meal
      </button>
      {props.signedInUserEmail ? (
        <FullRecipe
          meal={meal}
          signedInUserID={props.signedInUserID}
          fetchedRating={fetchedRating}
          setFetchedRating={setFetchedRating}
        />
      ) : (
        <RecipeNoUserSignedIn meal={meal} />
      )}
    </div>
  );
}
