

interface IOneCategory {
  category: ICategory;
}

export default function oneCategory(props: IOneCategory): JSX.Element {
  const category = props.category;
  return (
    <>
      <h1>{category.}</h1>
      <img src={category.strCategoryThumb} alt="category pic" />
    </>
  );
}
