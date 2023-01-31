import Meal from "../utils/interfaces/IMeal";
import createIngredientsAndQuantsArray from "../utils/createIngredientsAndQuantsArray";
import { Link } from "react-router-dom";
import createInstructionsParagraph from "../utils/createInstructionsParagraph";
import { Rating } from "react-simple-star-rating";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../index";

interface RecipeProps {
  meal: Meal | null;
}

interface IAvgRating {
  avg: number;
  count: number;
}

export default function RecipeNoUserSignedIn(props: RecipeProps): JSX.Element {
  const meal = props.meal;

  useEffect(() => {
    const postRecipeToDB = async () => {
      const body = {
        recipe_api_id: meal?.idMeal,
        recipe_name: meal?.strMeal,
        recipe_img_url: meal?.strMealThumb,
      };
      await axios.post(`${baseURL}/recipes`, body);
    };
    postRecipeToDB();
  }, [meal?.idMeal, meal?.strMeal, meal?.strMealThumb]);

  if (meal) {
    const ingredientsAndQuantsArray = createIngredientsAndQuantsArray(meal);
    return (
      <div className="ctn-recipe-no-user">
        <div className="ctn-recipe-title-no-user">
          <Link to="../meal-search/" style={{ textDecoration: "none" }}>
            <p className="recipe-back-btn">↩</p>
          </Link>
          <p className="recipe-title">{meal.strMeal}</p>
        </div>
        <div className="ctn-recipe-avg-rating-and-tags-no-user">
          <p className="recipe-avg-rating-text">average rating</p>
          <Rating
            initialValue={0}
            allowFraction={true}
            readonly={true}
            className="recipe-avg-rating"
          />
          <div className="ctn-recipe-tags">
            <Link
              to={`../meal-search/categories/${meal.strCategory}`}
              style={{ textDecoration: "none" }}
            >
              <p className="recipe-category">{meal.strCategory}</p>
            </Link>
            <Link
              to={`../meal-search/nationality/${meal.strArea}`}
              style={{ textDecoration: "none" }}
            >
              <p className="recipe-nationality">{meal.strArea}</p>
            </Link>
          </div>
        </div>
        {meal.strMealThumb && (
          <img
            src={meal.strMealThumb}
            alt=""
            className="recipe-image-no-user"
          />
        )}
        <div className="ctn-recipe-ingredients-no-user">
          <p className="recipe-ingredients-title">Ingredients</p>
          {ingredientsAndQuantsArray.map((element) => {
            return (
              <p key={element.id} className="recipe-one-ingredient">
                {element.ingredient?.toLowerCase()}:{" "}
                {element.quantity?.toLowerCase()}
              </p>
            );
          })}
        </div>
        <div className="ctn-recipe-instructions-no-user">
          <p className="recipe-instructions-title">Instructions</p>
          <div className="ctn-recipe-instructions-paragraphs">
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
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
