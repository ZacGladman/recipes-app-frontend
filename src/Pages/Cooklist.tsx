import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "..";
import ICooklistMeal from "../utils/interfaces/ICooklistMeal";
import MealPreviewB from "../components/MealPreviewB";
import { useParams } from "react-router-dom";

interface ICooklistProps {
  username: string;
}

export default function Cooklist({ username }: ICooklistProps): JSX.Element {
  const [cooklistMeals, setCooklistMeals] = useState<ICooklistMeal[]>();
  const { userID } = useParams();
  useEffect(() => {
    const fetchCooklist = async () => {
      const { data } = await axios.get(`${baseURL}/user/${userID}/cooklist`);
      if (data.length > 0) {
        setCooklistMeals(data);
      }
    };
    fetchCooklist();
  }, [userID]);

  return (
    <>
      <h1 className="cooklist-page-title">{username}'s CookList</h1>
      {cooklistMeals ? (
        <div className="ctn-meal-previews">
          {cooklistMeals.map((oneMeal) => {
            return <MealPreviewB meal={oneMeal} key={oneMeal.recipe_api_id} />;
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
