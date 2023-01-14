import Meal from "../utils/interfaces/IMeal";
import createIngredientsAndQuantsArray from "../utils/createIngredientsAndQuantsArray";
import { Link } from "react-router-dom";
import createInstructionsParagraph from "../utils/createInstructionsParagraph";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdAddComment } from "react-icons/md";

interface RecipeProps {
  meal: Meal | null;
}

export default function Recipe(props: RecipeProps): JSX.Element {
  const meal = props.meal;
  const [rating, setRating] = useState(0);
  console.log(rating);
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  if (meal) {
    const ingredientsAndQuantsArray = createIngredientsAndQuantsArray(meal);
    return (
      <div className="ctn-recipe">
        <div className="ctn-recipe-title">
          <Link to="../meal-search/" style={{ textDecoration: "none" }}>
            <p className="recipe-back-btn">↩</p>
          </Link>
          <p className="recipe-title">{meal.strMeal}</p>
        </div>
        <div className="ctn-recipe-avg-rating">
          <p className="recipe-avg-rating-text">average rating</p>
          <Rating
            onClick={handleRating}
            allowFraction={true}
            readonly={true}
            className="recipe-avg-rating"
          />
        </div>
        <Link to={`../meal-search/categories/${meal.strCategory}`}>
          <p className="recipe-category">{meal.strCategory}</p>
        </Link>
        <div className="recipe-actions-sidebox">
          <Rating
            onClick={handleRating}
            allowFraction={true}
            className="recipe-rating-input"
            fillColor={"#9545c1"}
          />
          <p className="recipe-rate">quick rate</p>
          <button
            className="recipe-review-btn"
            onClick={() => window.alert("not yet implemented")}
          >
            <MdAddComment className="recipe-review-btn-icon" />
            write a review
          </button>
          <button
            className="recipe-add-to-cooklist-btn"
            onClick={() => window.alert("not yet implemented")}
          >
            <MdOutlinePlaylistAdd className="add-to-cooklist-icon" />
            add to cooklist
          </button>
        </div>
        {meal.strMealThumb && (
          <img src={meal.strMealThumb} alt="" className="recipe-image" />
        )}
        <div className="ctn-recipe-ingredients">
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
        <div className="ctn-recipe-instructions">
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
