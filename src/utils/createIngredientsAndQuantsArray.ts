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
