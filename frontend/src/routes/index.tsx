import { useRoutes } from "react-router-dom";
import ROUTES from "../constant/routes.tsx";
import AddProductForm from "../components/AddProductForm.tsx";
import ProductList from "../components/ProductList.tsx";

export function AppRoutes() {
  return useRoutes([
    {
      path: ROUTES.HOME,
      element: <AddProductForm />,
    },
    {
      path: ROUTES.PRODUCTS,
      element: <ProductList />,
    },
  ]);
}
