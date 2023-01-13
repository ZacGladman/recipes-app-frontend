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
      <div className="ctn-single-category">
        {category.strCategoryThumb && (
          <img
            src={category.strCategoryThumb}
            alt="category pic"
            className="single-category-image"
          />
        )}
        <p className="single-category-title">{category.strCategory}</p>
      </div>
    </Link>
  );
}
