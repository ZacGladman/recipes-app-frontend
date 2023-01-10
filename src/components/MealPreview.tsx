import Meal from "../utils/interfaces/IMeal";
import IMealByIngredientOrNationOrCategory from "../utils/interfaces/IMealByIngredientOrNationOrCat";

interface IMealPreview {
  meal: IMealByIngredientOrNationOrCategory | Meal;
}

export default function MealPreviewA(props: IMealPreview): JSX.Element {
  const meal = props.meal;
  return (
    <>
      <h1>{meal.strMeal}</h1>
      {meal.strMealThumb !== null && <img src={meal.strMealThumb} alt="" />}
    </>
  );
}
