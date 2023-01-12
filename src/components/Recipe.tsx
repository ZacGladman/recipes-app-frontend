import Meal from "../utils/interfaces/IMeal";
import createIngredientsAndQuantsArray from "../utils/createIngredientsAndQuantsArray";

interface RecipeProps {
  meal: Meal | null;
}

export default function Recipe(props: RecipeProps): JSX.Element {
  const meal = props.meal;
  if (meal) {
    const ingredientsAndQuantsArray = createIngredientsAndQuantsArray(meal);
    return (
      <>
        <h1>{meal.strMeal}</h1>
        <Link to={`../meal-search/categories/${meal.strCategory}`}>
          <p>{meal.strCategory}</p>
        </Link>
        {meal.strMealThumb && (
          <img src={meal.strMealThumb} alt="" className="recipe-image" />
        )}
        {ingredientsAndQuantsArray.map((element) => {
          return (
            <p key={element.ingredient}>
              {element.ingredient?.toLowerCase()}:{" "}
              {element.quantity?.toLowerCase()}
            </p>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
}
