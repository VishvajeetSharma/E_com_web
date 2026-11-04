import { useParams } from "react-router-dom";
import CategoryPage from "@/Pages/Categories/components/CategoryPage";

/** Route: /category/:gender — women | men | kids. Layout and logic live in components/Category. */
const Category = () => {
  const { gender } = useParams();
  return <CategoryPage key={gender} gender={gender} />;
};

export default Category;
