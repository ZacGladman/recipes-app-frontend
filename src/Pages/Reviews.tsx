import { useEffect, useState } from "react";
import { baseURL } from "..";
import IReviewFromDB from "../utils/interfaces/IReviewFromDB";
import ReviewPreview from "../components/ReviewPreview";
import AvgRatingMealPreview from "../components/AvgRatingMealPreview";
import IRecipeAvgRating from "../utils/interfaces/IRecipeAvgRating";
import groupIntoFours from "../utils/carouselSectionsCreator";
import { BsCircleFill, BsCircle } from "react-icons/bs";

export default function Reviews(): JSX.Element {
  const [tenNewestReviews, setTenNewestReviews] = useState<
    IReviewFromDB[] | null
  >(null);
  const [tenHighestRatedRecipes, setTenHighestRatedRecipes] = useState<
    IRecipeAvgRating[] | null
  >(null);

  const [carouselDisplayedGroup, setCarouselDisplayedGroup] = useState<
    0 | 1 | 2 | 3
  >(0);

  const newestReviewsCarouselSections = tenNewestReviews
    ? groupIntoFours(tenNewestReviews)
    : null;

  useEffect(() => {
    const fetch16NewestReviews = async () => {
      const response = await fetch(baseURL + "/reviews/newest-16");
      const newestReviews = await response.json();
      setTenNewestReviews(newestReviews);
    };
    const fetch8HighestRatedRecipes = async () => {
      const response = await fetch(baseURL + "/reviews/top-8-rated");
      const tenHighestRated = await response.json();
      setTenHighestRatedRecipes(tenHighestRated);
    };
    fetch16NewestReviews();
    fetch8HighestRatedRecipes();
  }, []);

  return (
    <>
      <h1 className="reviews-page-title">reviews</h1>
      <p className="latest-reviews-title">latest reviews</p>
      <div className="ctn-review-previews">
        {newestReviewsCarouselSections &&
          newestReviewsCarouselSections[carouselDisplayedGroup].map(
            (oneReview) => {
              return (
                <ReviewPreview key={oneReview.review_id} review={oneReview} />
              );
            }
          )}
      </div>
      <div className="carousel-nav-buttons">
        {carouselDisplayedGroup === 0 ? (
          <BsCircleFill />
        ) : (
          <BsCircle onClick={() => setCarouselDisplayedGroup(0)} />
        )}
        {carouselDisplayedGroup === 1 ? (
          <BsCircleFill />
        ) : (
          <BsCircle onClick={() => setCarouselDisplayedGroup(1)} />
        )}
        {carouselDisplayedGroup === 2 ? (
          <BsCircleFill />
        ) : (
          <BsCircle onClick={() => setCarouselDisplayedGroup(2)} />
        )}
        {carouselDisplayedGroup === 3 ? (
          <BsCircleFill />
        ) : (
          <BsCircle onClick={() => setCarouselDisplayedGroup(3)} />
        )}
      </div>
      <p className="highest-rated-title">highest-rated recipes</p>
      <div className="ctn-meal-previews">
        {tenHighestRatedRecipes &&
          tenHighestRatedRecipes.map((oneRecipe) => (
            <AvgRatingMealPreview
              key={oneRecipe.recipe_api_id}
              recipe={oneRecipe}
            />
          ))}
      </div>
    </>
  );
}
