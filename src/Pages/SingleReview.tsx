import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { baseURL } from "..";
import IReviewFromDB from "../utils/interfaces/IReviewFromDB";

export default function SingleReview(): JSX.Element {
  const { reviewID } = useParams();
  const [review, setReview] = useState<IReviewFromDB | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`${baseURL}/reviews/${reviewID}`);
      const reviewJSON = await response.json();
      setReview(reviewJSON[0]);
    };
    fetchReview();
  }, [reviewID]);

  if (review) {
    return (
      <div className="ctn-single-review">
        <p className="single-review-recipe-title">{review.recipe_name}</p>
        <Link
          to={`../meal-search/${review.recipe_api_id}`}
          style={{ textDecoration: "none" }}
          className="single-review-button-to-full-recipe"
        >
          <button className="full-recipe-btn">full recipe</button>
        </Link>
        <div className="ctn-single-review-body">
          <img
            src={review.recipe_img_url}
            alt="recipe-pic"
            className="single-review-recipe-image"
          />
          <div className="ctn-reviewer-details-and-review">
            <div className="single-review-reviewer-details">
              {review.profile_pic && (
                <img
                  src={review.profile_pic}
                  alt="reviewer-profile-pic"
                  className="single-review-reviewer-profile-pic"
                />
              )}
              <p className="single-review-reviewer-username">
                Review by {review.username}
              </p>
            </div>
            <Rating
              initialValue={Number(review.rating_value)}
              allowFraction={true}
              readonly={true}
              className="single-review-recipe-avg-rating"
            />
            {review.review ? (
              <p className="single-review-text">{review.review}</p>
            ) : (
              <p className="single-review-text">no review written</p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <>fetching data</>;
  }
}

// profile_pic: string | null;
// rating_value: string;
// recipe_api_id: string;
// recipe_img_url: string;
// recipe_name: string;
// review: string | null;
// review_id: number;
// submission_time: string | null;
// username: string;
