import { useCallback, useEffect, useState } from "react";
import Meal from "../utils/interfaces/IMeal";
import Recipe from "../components/Recipe";
import { MdAutorenew } from "react-icons/md";

interface RandomRecipeProps {
  meal: Meal | null;
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
    <>
      <MdAutorenew onClick={() => fetchRandomMeal()} />
      <Recipe meal={meal} />
    </>
  );
}
