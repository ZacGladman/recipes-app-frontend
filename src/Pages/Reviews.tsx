import { useEffect, useState } from "react";
import { baseURL } from "..";
import IReviewFromDB from "../utils/interfaces/IReviewFromDB";

export default function Reviews(): JSX.Element {
  const [tenNewestReviews, setTenNewestReviews] = useState<
    IReviewFromDB[] | null
  >(null);
  console.log(tenNewestReviews);
  useEffect(() => {
    const fetch10NewestReviews = async () => {
      const response = await fetch(baseURL + "/reviews/newest-10");
      const newestReviews = await response.json();
      setTenNewestReviews(newestReviews);
    };
    fetch10NewestReviews();
  }, []);

  return <h1>reviews</h1>;
}
