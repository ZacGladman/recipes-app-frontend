import IMealByIngredientOrNationOrCategory from "../utils/interfaces/IMealByIngredientOrNationOrCat";

interface IMealPreview {
  meal: IMealByIngredientOrNationOrCategory;
}

export default function MealPreview({ meal }: IMealPreview): JSX.Element {
  return (
    <>
      {meal.strMealThumb && <img src={meal.strMealThumb} alt="" />}
      <h1>{meal.strMeal}</h1>
    </>
  );
}
