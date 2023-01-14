import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMealByIngredientOrNationOrCategory from "../utils/interfaces/IMealByIngredientOrNationOrCat";
import LoadingSpin from "react-loading-spin";
import MealPreviewA from "../components/MealPreviewA";

export default function MealsByCategory(): JSX.Element {
  const [meals, setMeals] = useState<
    IMealByIngredientOrNationOrCategory[] | null
  >(null);

  const { cat } = useParams();

  const endpoint =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + cat;

  console.log("endpoint: " + endpoint);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(endpoint);
      const mealsJson: { meals: IMealByIngredientOrNationOrCategory[] | null } =
        await response.json();
      console.log("mealsJSON" + mealsJson);
      setMeals(mealsJson.meals);
    };
    fetchMeals();
  }, [endpoint]);

  if (meals) {
    return (
      <div className="ctn-meals-by-category-or-nation">
        <div className="ctn-meals-by-category-or-nation-banner">
          <p className="title-meals-by-category-or-nation">{cat}</p>
        <div className="ctn-meal-previews">
    );
  } else {
    return (
      <>
        <p>fetching data</p>
        <LoadingSpin />
      </>
    );
  }
}
