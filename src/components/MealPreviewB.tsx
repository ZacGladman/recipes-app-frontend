import { Link } from "react-router-dom";
import ICooklistMeal from "../utils/interfaces/ICooklistMeal";

interface IMealPreview {
  meal: ICooklistMeal;
}

export default function MealPreviewA(props: IMealPreview): JSX.Element {
  const meal = props.meal;
  const id = meal.recipe_api_id;
  return (
    <Link to={`../meal-search/${id}`} style={{ textDecoration: "none" }}>
      <div className="ctn-single-meal-preview">
        {meal.recipe_img_url !== null && (
          <img
            src={meal.recipe_img_url}
            alt=""
            className="single-meal-preview-image"
          />
        )}
        <p className="single-meal-preview-title">{meal.recipe_name}</p>
      </div>
    </Link>
  );
}
