export default interface IReviewFromDB {
  profile_pic: string | null;
  rating_value: string;
  recipe_api_id: string;
  recipe_img_url: string;
  recipe_name: string;
  review: string | null;
  review_id: number;
  submission_time: string | null;
  username: string;
}
