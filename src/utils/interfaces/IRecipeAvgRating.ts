// SELECT recipes.recipe_api_id, recipes.recipe_name, recipes.recipe_img_url, AVG(recipe_reviews.rating_value)

import ICooklistMeal from "./ICooklistMeal";

export default interface IRecipeAvgRating extends ICooklistMeal {
  avg: string;
  count: string;
}
