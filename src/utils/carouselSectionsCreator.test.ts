import groupByFour from "./carouselSectionsCreator";

test("convert an array of items into a nested array, with each internal array having max length of 4", () => {
  expect(
    groupByFour([
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
    ])
  ).toStrictEqual([
    [
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
    ],
    [
      {
        recipe_api_id: "sample",
        recipe_name: "sample",
        recipe_img_url: "sample",
        avg: "sample",
        count: "sample",
      },
    ],
  ]);
});
