import { useState, useEffect } from "react";
import Meal, { Ingredient, Nationality } from "../utils/interfaces";
import IMeals from "../utils/interfaces";

export default function MealSearch(): JSX.Element {
  const [ingredients, setIngredients] = useState<{ meals: Ingredient[] }>();
  const [categories, setCategories] = useState<ICategories>();
  const [nationalies, setNationalities] = useState<{ meals: Nationality[] }>();
  const [randomMeal, setRandomMeal] = useState<Meal>();
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
    const jsonBody: { meals: Meal[] } = await response.json();
    setRandomMeal(jsonBody.meals[0]);
  async function fetchSearchedMeals(search: string) {
    const response = await fetch(
      `www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const jsonBody: { meals: Meal[] | null } = await response.json();
    setSearchedMeals(jsonBody);
  }
    console.log(jsonBody);
  }
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
          onClick={() => {
            setNavSelection("random");
            fetchRandomMeal();
          }}
        >
          random
        </button>
      </nav>
      {(navSelection === "meal-search" ||
        navSelection === "main-ingredient" ||
        navSelection === "nationality") && (
        <form
          onSubmit={(e) => {
            console.log("search submitted");
            e.preventDefault();
            setSearchInput("");
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
    </>
  );
}
