import { useParams } from "react-router-dom";
import Meal from "../utils/interfaces/IMeal";

interface RecipeProps {
  meal: Meal;
}

export default function RecipeWithParams(): JSX.Element {
  // const meal = props.meal;
  const mealname = useParams();
  return (
    <>
      <h1>{mealname}</h1>
      {/* <h1>{meal.strMeal}</h1>
      {meal.strMealThumb && <img src={meal.strMealThumb} alt="" />} */}
    </>
  );
}
