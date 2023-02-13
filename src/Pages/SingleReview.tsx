import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <>
        <p>{review.recipe_name}</p>
        <img src={review.recipe_img_url} alt="recipe-pic" />
        {review.profile_pic && (
          <img src={review.profile_pic} alt="reviewer-profile-pic" />
        )}
        <p>{review.username}</p>
        <p>{review.submission_time}</p>
        <Rating
          initialValue={Number(review.rating_value)}
          allowFraction={true}
          readonly={true}
          className="recipe-avg-rating"
        />
        {review.review ? <p>{review.review}</p> : <p>no review written</p>}
      </>
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
