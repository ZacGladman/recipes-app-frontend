import { Rating } from "react-simple-star-rating";
import IReviewFromDB from "../utils/interfaces/IReviewFromDB";

// profile_pic: string | null;
// rating_value: string;
// recipe_api_id: string;
// recipe_img_url: string;
// recipe_name: string;
// review: string | null;
// review_id: number;
// submission_time: string | null;
// username: string;

interface IReviewPreview {
  review: IReviewFromDB;
}

export default function ReviewPreview({ review }: IReviewPreview): JSX.Element {
  return (
    <div className="ctn-single-meal-preview">
      <div className="ctn-review-preview-details">
        {review.profile_pic && (
          <img
            src={review.profile_pic}
            alt="reviewer pic"
            className="reviewer-pic"
          />
        )}
        <p className="review-preview-reviewer-name">{review.username}</p>
        <Rating
          initialValue={Number(review.rating_value)}
          allowFraction={true}
          readonly={true}
          className="recipe-avg-rating"
          size={25}
        />
      </div>
      {review.recipe_img_url !== null && (
        <img
          src={review.recipe_img_url}
          alt=""
          className="single-meal-preview-image"
        />
      )}
      <p className="single-meal-preview-title">{review.recipe_name}</p>
    </div>
  );
}
