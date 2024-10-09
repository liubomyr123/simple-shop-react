import { products_mock } from "@src/app/store/products";
import { loadProducts } from "@src/app/store/slices/product";
import { useAppDispatch, useAppSelector } from "@store";
import { useEffect } from "react";

export default function Main (): JSX.Element {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadProducts({ products: products_mock }));
    }, 2_000);
  }, []);

  console.log(products);

  return (
    <div>
      {!products.length
        ? <>Loading</>
        : <h2>Main</h2>
      }
    </div>
  );
}
