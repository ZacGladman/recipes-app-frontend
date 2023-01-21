import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Meal from "../utils/interfaces/IMeal";
import FullRecipe from "../components/FullRecipe";
import RecipeNoUserSignedIn from "../components/RecipeNoSignedInUser";

interface IRecipeWithParams {
  signedInUserEmail: string | null | undefined;
  signedInUserID: number | null;
}

export default function RecipeWithParams({
  signedInUserEmail,
  signedInUserID,
}: IRecipeWithParams): JSX.Element {
  const [meal, setMeal] = useState<Meal>();
  const [fetchedRating, setFetchedRating] = useState<number | null>(null);

  const { id } = useParams();
  const endpoint = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + id;

  useEffect(() => {
    const fetchMealByID = async () => {
      const response = await fetch(endpoint);
      const meal: { meals: Meal[] } = await response.json();
      setMeal(meal.meals[0]);
    };
    fetchMealByID();
  }, [endpoint]);

  if (meal) {
    return signedInUserEmail ? (
      <FullRecipe
        meal={meal}
        signedInUserID={signedInUserID}
        fetchedRating={fetchedRating}
        setFetchedRating={setFetchedRating}
      />
    ) : (
      <RecipeNoUserSignedIn meal={meal} />
    );
  } else {
    return <></>;
  }
}
