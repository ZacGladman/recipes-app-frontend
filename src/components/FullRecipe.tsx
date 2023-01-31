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
import Popup from "reactjs-popup";

interface RecipeProps {
  meal: Meal | null;
  signedInUserID: number | null;
  fetchedRating: number | null;
  setFetchedRating: React.Dispatch<React.SetStateAction<number | null>>;
}

interface IAvgRating {
  avg: number;
  count: number;
}

export default function FullRecipe(props: RecipeProps): JSX.Element {
  const meal = props.meal;
  const signedInUserID = props.signedInUserID;
  const [avgRating, setAvgRating] = useState<IAvgRating | null>(null);
  const [cooklistID, setCooklistID] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [reviewText, setReviewText] = useState<string>("");
  const [preexistingReview, setPreexistingReview] = useState<string>();
  const [fullReviewRating, setFullReviewRating] = useState<number | null>(null);
  const closeModal = () => setOpen(false);
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

  const handleReviewSubmitClicked = async () => {
    if (fullReviewRating && reviewText.length > 0) {
      await axios.post(
        `${baseURL}/reviews/new-full/recipe/${meal?.idMeal}/user/${signedInUserID}`,
        { rating_value: fullReviewRating, review: reviewText }
      );
      setOpen(false);
      setReviewText("");
    } else {
      window.alert("missing fields in your review!");
    }
  };
  // "/reviews/new-full/recipe/:recipeID/user/:userID",
  // async (req, res) => {
  //   try {
  //     const { recipeID, userID } = req.params;
  //     const { rating_value, review } = req.body;

  const fetchRating = useCallback(async () => {
      const { data } = await axios.get(
      `${baseURL}/reviews/recipe/${meal?.idMeal}/user/${signedInUserID}`
      );
      if (data.length > 0) {
      props.setFetchedRating(Number(data[0].rating_value));
      setPreexistingReview(data[0].review);
    } else {
      props.setFetchedRating(null);
    }
  }, [meal?.idMeal, props, signedInUserID]);

      }
    };
    const fetchRating = async () => {
      const { data } = await axios.get(
        `${baseURL}/reviews/recipe/${meal?.idMeal}/user/${signedInUserID}`
      );
      if (data.length > 0) {
        props.setFetchedRating(Number(data[0].rating_value));
        setPreexistingReview(data[0].review);
      } else {
        props.setFetchedRating(null);
      }
    };
    const postRecipeToDB = async () => {
      const body = {
        recipe_api_id: meal?.idMeal,
        recipe_name: meal?.strMeal,
        recipe_img_url: meal?.strMealThumb,
      };
      if (meal) {
        await axios.post(`${baseURL}/recipes`, body);
      }
    };

    postRecipeToDB();
    fetchCooklistStatus();
    fetchRating();
  }, [
    meal,
    meal?.idMeal,
    meal?.strMeal,
    meal?.strMealThumb,
    signedInUserID,
    props,
  ]);

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
          {props.fetchedRating ? (
            <Rating
              initialValue={props.fetchedRating}
              onClick={handleRating}
              allowFraction={true}
              className="recipe-rating-input"
              fillColor={"#9545c1"}
            />
          ) : (
            <Rating
              initialValue={0}
              onClick={handleRating}
              allowFraction={true}
              className="recipe-rating-input"
              fillColor={"#878787fb"}
            />
          )}

          <p className="recipe-rate">quick rate</p>
          <div>
            <button
              type="button"
              className="recipe-review-btn"
              onClick={() => setOpen((o) => !o)}
            >
              <MdAddComment className="recipe-review-btn-icon" />
              {preexistingReview ? "edit your review" : "write a review"}
            </button>
            <Popup
              open={open}
              closeOnDocumentClick
              onClose={closeModal}
              className="pop-up-form"
            >
              <div className="pop-up-content">
                <p className="pop-up-meal-title">{meal.strMeal}</p>
                <Rating
                  initialValue={props.fetchedRating ?? 0}
                  onClick={(rate) => setFullReviewRating(rate)}
                  allowFraction={true}
                  className="recipe-rating-input"
                  fillColor={"#ffd700"}
                />
                <textarea
                  className="pop-up-text-input"
                  cols={30}
                  rows={10}
                  value={preexistingReview ?? reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <button
                  className="pop-up-submit-button"
                  onClick={handleReviewSubmitClicked}
                >
                  submit
                </button>
              </div>
            </Popup>
          </div>
          {cooklistID ? (
            <button
              className="recipe-add-to-cooklist-btn"
              onClick={handleRemoveFromCooklistClicked}
            >
              <MdOutlinePlaylistAdd className="add-to-cooklist-icon" />
              remove from cooklist
            </button>
          ) : (
            <button
              className="recipe-add-to-cooklist-btn"
              onClick={handleAddToCooklistClicked}
            >
              <MdOutlinePlaylistAdd className="add-to-cooklist-icon" />
              add to cooklist
            </button>
          )}
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
