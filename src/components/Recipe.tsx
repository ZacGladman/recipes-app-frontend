import Meal from "../utils/interfaces/IMeal";
import createIngredientsAndQuantsArray from "../utils/createIngredientsAndQuantsArray";
import createInstructionsParagraph from "../utils/createInstructionsParagraph";

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
        <p>Ingredients</p>
        {ingredientsAndQuantsArray.map((element) => {
          return (
            <p key={element.id}>
              {element.ingredient?.toLowerCase()}:{" "}
              {element.quantity?.toLowerCase()}
            </p>
          );
        })}
        <div className="ctn-recipe-instructions">
          <p>Instructions</p>
          {meal.strInstructions ? (
            createInstructionsParagraph(meal.strInstructions).map(
              (paragraph) => (
                <p key={paragraph.key} className="instructions-paragraph">
                  {paragraph.text}
                </p>
              )
            )
          ) : (
            <p>no instructions found!</p>
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
