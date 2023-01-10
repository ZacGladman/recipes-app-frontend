import { useState, useEffect } from "react";
import Meal from "../utils/interfaces/IMeal";
import ICategory from "../utils/interfaces/ICategory";
import INationality from "../utils/interfaces/INationality";
import OneCategory from "../components/oneCategory";
import Ingredient from "../utils/interfaces/Ingredient";
import IMealByIngredient from "../utils/interfaces/IMealByIngredient";

export default function MealSearch(): JSX.Element {
  const [ingredients, setIngredients] = useState<{ meals: Ingredient[] }>();
  const [mealsByIngredient, setMealsByIngredient] =
    useState<{ meals: IMealByIngredient[] | null }>();
  const [categories, setCategories] = useState<{ categories: ICategory[] }>();
  const [nationalies, setNationalities] = useState<{ meals: INationality[] }>();
  const [randomMeal, setRandomMeal] = useState<Meal>();
  const [searchedMeals, setSearchedMeals] =
    useState<{ meals: Meal[] | null }>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [navSelection, setNavSelection] = useState<
    "meal-search" | "category" | "main-ingredient" | "nationality" | "random"
  >("meal-search");

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
    console.log("response" + response);
    const jsonBody: { meals: Meal[] } = await response.json();
    console.log("jsonBody: " + jsonBody);
    console.log(jsonBody.meals);
    setRandomMeal(jsonBody.meals[0]);
  }

  async function fetchSearchedMeals(search: string) {
    const endpoint =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search;
    console.log(endpoint);
    const response = await fetch(endpoint);
    const mealsOrNull: { meals: Meal[] | null } = await response.json();
    console.log(mealsOrNull);
    setSearchedMeals(mealsOrNull);
  }

  async function fetchByMainIngredient(search: string) {
    const endpoint =
      "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + search;
    try {
      const response = await fetch(endpoint);
      try {
        const mealsOrNull: { meals: IMealByIngredient[] | null } =
          await response.json();
        setMealsByIngredient(mealsOrNull);
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
    } else if (navSelection === "nationality") {
      console.log("nationality search");
    } else {
      await fetchByMainIngredient(searchInput);
    }
    setSearchInput("");
  };

  return (
    <>
      <nav>
        <button onClick={() => setNavSelection("meal-search")}>
          meal search
        </button>
        <button onClick={() => setNavSelection("category")}>category</button>
        <button onClick={() => setNavSelection("main-ingredient")}>
          main ingredient
        </button>
        <button onClick={() => setNavSelection("nationality")}>
          nationality
        </button>
        <button
          onClick={async () => {
            setNavSelection("random");
            await fetchRandomMeal();
          }}
        >
          random
        </button>
      </nav>
      {(navSelection === "meal-search" ||
        navSelection === "main-ingredient" ||
        navSelection === "nationality") && (
        <form
          onSubmit={async (e) => {
            await handleSubmitSearch(e);
          }}
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      )}
      {navSelection === "random" && randomMeal && <p>{randomMeal.strMeal}</p>}
      {navSelection === "category" &&
        categories?.categories.map((oneCat) => (
          <OneCategory category={oneCat} key={oneCat.idCategory} />
        ))}
      {navSelection === "main-ingredient" &&
        (mealsByIngredient ? (
          <>
            <h1></h1>
          </>
        ) : (
          <h1>No meals were found containing this ingredient!</h1>
        ))}
    </>
  );
}
