import ICategory from "../utils/interfaces/ICategory";

interface IOneCategory {
  category: ICategory;
}

export default function OneCategory(props: IOneCategory): JSX.Element {
  const category = props.category;
  return (
    <>
      <h1>{category.strCategory}</h1>
      {category.strCategoryThumb && (
        <img src={category.strCategoryThumb} alt="category pic" />
      )}
    </>
  );
}
