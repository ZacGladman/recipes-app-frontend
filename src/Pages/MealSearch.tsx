import { useState, useEffect } from "react";
import Meal from "../utils/interfaces/IMeal";
import ICategory from "../utils/interfaces/ICategory";
import INationality from "../utils/interfaces/INationality";
import OneCategory from "../components/oneCategory";
import Ingredient from "../utils/interfaces/Ingredient";
import IMealByIngredientOrNationOrCategory from "../utils/interfaces/IMealByIngredientOrNationOrCat";
import MealPreviewA from "../components/MealPreviewA";
import { Link } from "react-router-dom";

interface MealSearchProps {
  selectedMeal: Meal | null;
  setSelectedMeal: React.Dispatch<React.SetStateAction<Meal | null>>;
}

export default function MealSearch(props: MealSearchProps): JSX.Element {
  const [ingredients, setIngredients] = useState<{ meals: Ingredient[] }>();
  const [mealsByIngredient, setMealsByIngredient] = useState<
    IMealByIngredientOrNationOrCategory[] | null
  >(null);
  const [categories, setCategories] = useState<{ categories: ICategory[] }>();
  const [nationalies, setNationalities] = useState<{ meals: INationality[] }>();

  const [searchedMeals, setSearchedMeals] = useState<Meal[] | null>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [navSelection, setNavSelection] = useState("dish-name");

  useEffect(() => {
    async function fetchIngredients() {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );
      const jsonBody = await response.json();
      setIngredients(jsonBody);
    }
    async function fetchCategories() {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const jsonBody = await response.json();
      setCategories(jsonBody);
    }
    async function fetchNationalities() {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      const jsonBody = await response.json();
      setNationalities(jsonBody);
    }

    fetchIngredients();
    fetchCategories();
    fetchNationalities();
  }, []);

  async function fetchRandomMeal() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const jsonBody: { meals: Meal[] } = await response.json();
    props.setSelectedMeal(jsonBody.meals[0]);
  }

  async function fetchSearchedMeals(search: string) {
    const endpoint =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search;
    const response = await fetch(endpoint);
    const mealsOrNull: { meals: Meal[] | null } = await response.json();
    setSearchedMeals(mealsOrNull.meals);
  }

  async function fetchByMainIngredient(search: string) {
    const endpoint =
      "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + search;
    try {
      const response = await fetch(endpoint);
      try {
        const mealsOrNull: {
          meals: IMealByIngredientOrNationOrCategory[] | null;
        } = await response.json();
        setMealsByIngredient(mealsOrNull.meals);
      } catch (error) {
        console.log("ERROR IN SECTION TWO!");
        console.error(error);
      }
    } catch (error) {
      console.log("ERROR IN SECTION 1!");
      console.error(error);
    }
  }

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (navSelection === "meal-search") {
      await fetchSearchedMeals(searchInput);
    } else {
      await fetchByMainIngredient(searchInput);
      console.log(mealsByIngredient);
    }
    setSearchInput("");
  };

  return (
    <>
      <div className="ctn-meal-search-options">
        <select
          className="ctn-meal-search-dropdown"
          value={navSelection}
          onChange={(event) => setNavSelection(event.target.value)}
        >
          <option value="" disabled selected>
            search option
          </option>
          <option className="dropdown-option" value="dish-name">
            dish name
          </option>
          <option className="dropdown-option" value="main-ingredient">
            contains ingredient
          </option>
          <option className="dropdown-option" value="category">
            category
          </option>
          <option className="dropdown-option" value="nationality">
            place of origin
          </option>
        </select>
      {navSelection === "category" && (
        <div className="ctn-categories-list">
          {categories?.categories.map((oneCat) => (
            <OneCategory category={oneCat} key={oneCat.idCategory} />
          ))}
        </div>
      )}

      {navSelection === "main-ingredient" && mealsByIngredient && (
        <div className="ctn-meal-previews">
          {mealsByIngredient.map((oneMeal) => (
            <MealPreviewA meal={oneMeal} key={oneMeal.idMeal} />
          ))}
        </div>
      )}

      {navSelection === "meal-search" && searchedMeals && (
        <div className="ctn-meal-previews">
          {searchedMeals.map((oneMeal) => (
            <MealPreviewA meal={oneMeal} key={oneMeal.idMeal} />
          ))}
        </div>
      )}

      {navSelection === "nationality" && nationalies && (
        <div className="ctn-nationalities">
          {nationalies.meals.map((oneNationality) => (
            <Link
              to={`../meal-search/nationality/${oneNationality.strArea}`}
              key={oneNationality.strArea}
            >
              <button>{oneNationality.strArea}</button>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
