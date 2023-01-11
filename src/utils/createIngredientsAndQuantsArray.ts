import Meal from "./interfaces/IMeal";

function filterMeal(meal: Meal, filterTerm: string) {
  const filteredKeyArray = Object.keys(meal).filter((key) =>
    key.includes(filterTerm)
  );
  console.log(filteredKeyArray);
  const filteredMeal = filteredKeyArray.map((key) => meal[key]);
  const filteredMealNoEmptyStrings = filteredMeal.filter((string) => string);
  return filteredMealNoEmptyStrings;
}

// export default function createIngredientsAndQuantsArray(
//   meal: Meal
// ): { ingredient: string; quantity: string }[] {
//   const returnArray = [];
//   const ingredientsArray = filterMeal(meal, "strIngredient");
//   const quantitiesArray = filterMeal(meal, "strMeasure");
//   for (let i = 0; i < ingredientsArray.length; i++) {
//     returnArray.push({
//       ingredient: ingredientsArray[i],
//       quantity: quantitiesArray[i],
//     });
//   }
//   return returnArray;
// }
