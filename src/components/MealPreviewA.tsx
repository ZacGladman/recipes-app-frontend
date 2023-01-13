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
    <Link to={`../meal-search/${id}`} style={{ textDecoration: "none" }}>
      <div className="ctn-single-meal-preview">
        {meal.strMealThumb !== null && (
          <img
            src={meal.strMealThumb}
            alt=""
            className="single-meal-preview-image"
          />
        )}
        <p className="single-meal-preview-title">{meal.strMeal}</p>
      </div>
    </Link>
  );
}
