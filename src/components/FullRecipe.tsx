import Meal from "../utils/interfaces/IMeal";
import createIngredientsAndQuantsArray from "../utils/createIngredientsAndQuantsArray";
import { Link } from "react-router-dom";
import createInstructionsParagraph from "../utils/createInstructionsParagraph";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdAddComment } from "react-icons/md";
import axios from "axios";
import { baseURL } from "../index";

interface RecipeProps {
  meal: Meal | null;
}

export default function FullRecipe(props: RecipeProps): JSX.Element {
  const meal = props.meal;
  const handleRating = async (rate: number) => {
    await axios.post(
      `${baseURL}/reviews/new-quick/recipe/${meal?.idMeal}/user/${signedInUserID}`,
      { rating_value: rate }
    );
  };
  const handleAddToCooklistClicked = async () => {
    const { data } = await axios.post(
      `${baseURL}/user/${signedInUserID}/cooklist/new`,
      {
        recipe_api_id: meal?.idMeal,
      }
    );
    setCooklistID(data.cooklist_id);
  };
  const handleRemoveFromCooklistClicked = async () => {
    await axios.delete(`${baseURL}/cooklist/${cooklistID}`);
    setCooklistID(null);
  };

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
      <div className="ctn-recipe">
        <div className="ctn-recipe-title">
          <Link to="../meal-search/" style={{ textDecoration: "none" }}>
            <p className="recipe-back-btn">↩</p>
          </Link>
          <p className="recipe-title">{meal.strMeal}</p>
        </div>
        <div className="ctn-recipe-avg-rating-and-tags">
          <p className="recipe-avg-rating-text">average rating</p>
          <Rating
            onClick={handleRating}
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
