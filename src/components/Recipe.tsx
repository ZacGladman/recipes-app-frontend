import Meal from "../utils/interfaces/IMeal";

interface RecipeProps {
  meal: Meal | null;
}

export default function Recipe(props: RecipeProps): JSX.Element {
  const meal = props.meal;
  if (meal) {
    return (
      <>
        <h1>{meal.strMeal}</h1>
        {meal.strMealThumb && (
          <img src={meal.strMealThumb} alt="" className="recipe-image" />
        )}
      </>
    );
  } else {
    return <></>;
  }
}
