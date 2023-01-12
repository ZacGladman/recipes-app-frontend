import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Meal from "../utils/interfaces/IMeal";
import Recipe from "../components/Recipe";

export default function RecipeWithParams(): JSX.Element {
  const [meal, setMeal] = useState<Meal>();

  const { id } = useParams();
  const endpoint = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + id;

  useEffect(() => {
    const fetchMealByID = async () => {
      const response = await fetch(endpoint);
      const meal: { meals: Meal[] } = await response.json();
      setMeal(meal.meals[0]);
    };
    fetchMealByID();
  }, [endpoint]);

  if (meal) {
    return <Recipe meal={meal} />;
  } else {
    return <></>;
  }
}
