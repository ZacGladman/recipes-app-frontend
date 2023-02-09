import MealPreviewB from "./MealPreviewB";
import IRecipeAvgRating from "../utils/interfaces/IRecipeAvgRating";
import { Rating } from "react-simple-star-rating";

interface IRecipeAvgRatingProps {
  recipe: IRecipeAvgRating;
}
export default function AvgRatingMealPreview({
  recipe,
}: IRecipeAvgRatingProps): JSX.Element {
  const recipeForMealPreview = {
    recipe_api_id: recipe.recipe_api_id,
    recipe_name: recipe.recipe_name,
    recipe_img_url: recipe.recipe_img_url,
  };
  return (
    <div className="ctn-AvgRatingMealPreview">
      <div className="ctn-AvgRatingMealPreview-rating-details">
        <Rating
          initialValue={Number(recipe.avg)}
          allowFraction={true}
          readonly={true}
          className="recipe-avg-rating"
          size={40}
        />
        <p>
          {Number(recipe.count)}{" "}
          {Number(recipe.count) === 1 ? "review" : "reviews"}
        </p>
      </div>
      <MealPreviewB meal={recipeForMealPreview} />
    </div>
  );
}
