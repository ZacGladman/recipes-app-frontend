import { Link } from "react-router-dom";
import Meal from "../utils/interfaces/IMeal";
import IMealByIngredientOrNationOrCategory from "../utils/interfaces/IMealByIngredientOrNationOrCat";

interface IMealPreview {
  meal: IMealByIngredientOrNationOrCategory | Meal;
}

export default function MealPreviewA(props: IMealPreview): JSX.Element {
  const meal = props.meal;
  const id = meal.idMeal;
  return (
    <Link to={`${id}`}>
      <div>
        <h1>{meal.strMeal}</h1>
        {meal.strMealThumb !== null && <img src={meal.strMealThumb} alt="" />}
      </div>
    </Link>
  );
}
