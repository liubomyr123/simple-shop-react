import { products_mock } from "@src/app/store/products";
import { loadProducts } from "@src/app/store/slices/product";
import { useAppDispatch, useAppSelector } from "@store";
import { useEffect } from "react";

import MainFilters from "./MainFilters";
import ListOfProducts from "./ListOfProducts";

export default function Main (): JSX.Element {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadProducts({ products: products_mock }));
    }, 2_000);
  }, []);

  console.log(products);

  if (!products.length) {
    return <>Loading...</>;
  }
  return (
    <main className="flex w-10/12 m-auto pt-2">
      <MainFilters products={products} />
      <ListOfProducts products={products} />
    </main>
  );
}
