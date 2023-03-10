import createIngredientsAndQuantsArray from "./createIngredientsAndQuantsArray";

test("correctly works with empty ingredients and quantities", () => {
  expect(
    createIngredientsAndQuantsArray({
      idMeal: "53012",
      strMeal: "Gigantes Plaki",
      strDrinkAlternate: null,
      strCategory: "Vegetarian",
      strArea: "Greek",
      strInstructions:
        "Soak the beans overnight in plenty of water. Drain, rinse, then place in a pan covered with water. Bring to the boil, reduce the heat, then simmer for approx 50 mins until slightly tender but not soft. Drain, then set aside.\r\n\r\nHeat oven to 180C/160C fan/gas 4. Heat the olive oil in a large frying pan, tip in the onion and garlic, then cook over a medium heat for 10 mins until softened but not browned. Add the tomato purée, cook for a further min, add remaining ingredients, then simmer for 2-3 mins. Season generously, then stir in the beans. Tip into a large ovenproof dish, then bake for approximately 1 hr, uncovered and without stirring, until the beans are tender. The beans will absorb all the fabulous flavours and the sauce will thicken. Allow to cool, then scatter with parsley and drizzle with a little more olive oil to serve.",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/b79r6f1585566277.jpg",
      strTags: null,
      strYoutube: "https://www.youtube.com/watch?v=e-2K2iyPASA",
      strIngredient1: "Butter Beans",
      strIngredient2: "",
      strIngredient3: "",
      strIngredient4: "",
      strIngredient5: "",
      strIngredient6: "",
      strIngredient7: "",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strIngredient16: "",
      strIngredient17: "",
      strIngredient18: "",
      strIngredient19: "",
      strIngredient20: "",
      strMeasure1: "400g",
      strMeasure2: "",
      strMeasure3: "",
      strMeasure4: "",
      strMeasure5: "",
      strMeasure6: "",
      strMeasure7: "",
      strMeasure8: "",
      strMeasure9: "",
      strMeasure10: "",
      strMeasure11: " ",
      strMeasure12: " ",
      strMeasure13: " ",
      strMeasure14: " ",
      strMeasure15: " ",
      strMeasure16: " ",
      strMeasure17: " ",
      strMeasure18: " ",
      strMeasure19: " ",
      strMeasure20: " ",
      strSource: "https://www.bbcgoodfood.com/recipes/gigantes-plaki",
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    })
  ).toStrictEqual([{ id: 0, ingredient: "Butter Beans", quantity: "400g" }]);
});
