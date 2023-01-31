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
  const [avgRating, setAvgRating] = useState<IAvgRating | null>(null);

  useEffect(() => {
    const postRecipeToDB = async () => {
      const body = {
        recipe_api_id: meal?.idMeal,
        recipe_name: meal?.strMeal,
        recipe_img_url: meal?.strMealThumb,
      };
      await axios.post(`${baseURL}/recipes`, body);
    };
    const fetchAvgRating = async () => {
      const response = await fetch(
        `${baseURL}/reviews/recipe/${props.meal?.idMeal}/avg-rating`
      );
      const ratingJSON = await response.json();
      console.log(ratingJSON);
      if (ratingJSON.length > 0) {
        const avgRating = ratingJSON[0].avg;
        const roundedRating = Math.round(avgRating * 2) / 2;
        const count = Number(ratingJSON[0].count);
        setAvgRating({ avg: roundedRating, count: count });
      } else {
        setAvgRating(null);
      }
    };
    fetchAvgRating();
    postRecipeToDB();
  }, [meal?.idMeal, meal?.strMeal, meal?.strMealThumb, props.meal?.idMeal]);

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
          {avgRating && (
            <>
          <p className="recipe-avg-rating-text">average rating</p>
          <Rating
                initialValue={avgRating.avg}
            allowFraction={true}
            readonly={true}
            className="recipe-avg-rating"
          />
              <p>
                {avgRating.count} {avgRating.count === 1 ? "review" : "reviews"}
              </p>
            </>
          )}
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
