import { Link } from "react-router-dom";
import ICategory from "../utils/interfaces/ICategory";

interface IOneCategory {
  category: ICategory;
}

export default function OneCategory(props: IOneCategory): JSX.Element {
  const category = props.category;
  return (
    <Link
      to={`/meal-search/categories/${category.strCategory}`}
      style={{ textDecoration: "none" }}
    >
      <p className="color-change-3x">{category.strCategory}</p>
    </Link>
  );
}
