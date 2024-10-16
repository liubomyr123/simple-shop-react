import { webp } from "@shared";
import type { Category, Product } from "@shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@store";
import { addProductToCart } from "@app/store/slices/shopping-cart";
import { addProductToFavorite, removeProductFromFavorite } from "@app/store/slices/favorite-cart";
import { useNavigate } from "react-router-dom";

interface MainFiltersProps {
  products: Product[];
}

function sortProductsOnStock (arr: Product[]): Product[] {
  const sortedArray: Product[] = [];
  const nonZeroArray: Product[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].stock === 0) {
      sortedArray.push(arr[i]);
    } else {
      nonZeroArray.push(arr[i]);
    }
  }

  return nonZeroArray.concat(sortedArray);
}

export default function ListOfProducts ({ products }: MainFiltersProps): JSX.Element {
  const [listFormat, setListFormat] = useState<("list" | "tabs")>("tabs");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sortedProducts, setSortedProducts] = useState< Product[]>([]);

  useEffect(() => {
    setSortedProducts(sortProductsOnStock(products));
  }, []);

  function handleChangeSort (sortType: string): void {
    const sortedArray: Product[] = [];
    const nonZeroArray: Product[] = [];

    for (let i = 0; i < sortedProducts.length; i++) {
      if (sortedProducts[i].stock === 0) {
        sortedArray.push(sortedProducts[i]);
      } else {
        nonZeroArray.push(sortedProducts[i]);
      }
    }

    if (sortType === "cheap") {
      const sortedItems = nonZeroArray.slice().sort((a, b) => {
        const discountPriceA = (a.price * (100 - a.discount) / 100);
        const discountPriceB = (b.price * (100 - b.discount) / 100);
        return discountPriceA - discountPriceB;
      });
      setSortedProducts(sortedItems.concat(sortedArray));
    } else if (sortType === "expensive") {
      const sortedItems = nonZeroArray.slice().sort((a, b) => {
        const discountPriceA = (a.price * (100 - a.discount) / 100);
        const discountPriceB = (b.price * (100 - b.discount) / 100);
        return discountPriceB - discountPriceA;
      });
      setSortedProducts(sortedItems.concat(sortedArray));
    }
  }
  function addToCart (product: Product): void {
    dispatch(addProductToCart({ product }));
    toast("Product added to shopping cart");
  }
  function addToFavorites (product: Product): void {
    dispatch(addProductToFavorite({ product }));
    toast("Product added to favorites");
  }
  function removeFromFavorites (product: Product): void {
    dispatch(removeProductFromFavorite({ productId: product.id }));
    toast("Product removed from favorites");
  }
  function openProductDetails (product: Product): void {
    navigate(`/product/${product.id}`);
  }
  return (
    <section className="w-full bg-green-0 p-3">
      <header className="flex justify-between pb-5 bg-red-0 px-4">
        <div className="flex gap-4 justify-center items-center">
          <div className="cursor-pointer" onClick={() => setListFormat("tabs")}>
            <svg width="20px" height="20px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-139.000000, -200.000000)" fill="#000">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M101.9,57.009 C101.9,57.56 101.38235,58 100.80275,58 L97.65275,58 C97.0742,58 96.65,57.56 96.65,57.009 L96.65,54.009 C96.65,53.458 97.0742,53 97.65275,53 L100.80275,53 C101.38235,53 101.9,53.458 101.9,54.009 L101.9,57.009 Z M100.80275,51 L97.65275,51 C95.9129,51 94.55,52.352 94.55,54.009 L94.55,57.009 C94.55,58.666 95.9129,60 97.65275,60 L100.80275,60 C102.5426,60 104,58.666 104,57.009 L104,54.009 C104,52.352 102.5426,51 100.80275,51 L100.80275,51 Z M90.35,57.009 C90.35,57.56 89.83235,58 89.25275,58 L86.10275,58 C85.5242,58 85.1,57.56 85.1,57.009 L85.1,54.009 C85.1,53.458 85.5242,53 86.10275,53 L89.25275,53 C89.83235,53 90.35,53.458 90.35,54.009 L90.35,57.009 Z M89.25275,51 L86.10275,51 C84.3629,51 83,52.352 83,54.009 L83,57.009 C83,58.666 84.3629,60 86.10275,60 L89.25275,60 C90.9926,60 92.45,58.666 92.45,57.009 L92.45,54.009 C92.45,52.352 90.9926,51 89.25275,51 L89.25275,51 Z M101.9,46.009 C101.9,46.56 101.38235,47 100.80275,47 L97.65275,47 C97.0742,47 96.65,46.56 96.65,46.009 L96.65,43.009 C96.65,42.458 97.0742,42 97.65275,42 L100.80275,42 C101.38235,42 101.9,42.458 101.9,43.009 L101.9,46.009 Z M100.80275,40 L97.65275,40 C95.9129,40 94.55,41.352 94.55,43.009 L94.55,46.009 C94.55,47.666 95.9129,49 97.65275,49 L100.80275,49 C102.5426,49 104,47.666 104,46.009 L104,43.009 C104,41.352 102.5426,40 100.80275,40 L100.80275,40 Z M90.35,46.009 C90.35,46.56 89.83235,47 89.25275,47 L86.10275,47 C85.5242,47 85.1,46.56 85.1,46.009 L85.1,43.009 C85.1,42.458 85.5242,42 86.10275,42 L89.25275,42 C89.83235,42 90.35,42.458 90.35,43.009 L90.35,46.009 Z M89.25275,40 L86.10275,40 C84.3629,40 83,41.352 83,43.009 L83,46.009 C83,47.666 84.3629,49 86.10275,49 L89.25275,49 C90.9926,49 92.45,47.666 92.45,46.009 L92.45,43.009 C92.45,41.352 90.9926,40 89.25275,40 L89.25275,40 Z"
                      id="menu_navigation_grid-[#000]">
                    </path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className="cursor-pointer" onClick={() => setListFormat("list")}>
            <svg width="20px" height="20px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-59.000000, -160.000000)" fill="#000000">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M6.15,14 C7.88985,14 9.3,15.343 9.3,17 C9.3,18.657 7.88985,20 6.15,20 C4.41015,20 3,18.657 3,17 C3,15.343 4.41015,14 6.15,14 L6.15,14 Z M6.15,16 C5.57145,16 5.1,16.449 5.1,17 C5.1,17.551 5.57145,18 6.15,18 C6.72855,18 7.2,17.551 7.2,17 C7.2,16.449 6.72855,16 6.15,16 L6.15,16 Z M6.15,0 C7.88985,0 9.3,1.343 9.3,3 C9.3,4.657 7.88985,6 6.15,6 C4.41015,6 3,4.657 3,3 C3,1.343 4.41015,0 6.15,0 L6.15,0 Z M6.15,2 C5.57145,2 5.1,2.449 5.1,3 C5.1,3.551 5.57145,4 6.15,4 C6.72855,4 7.2,3.551 7.2,3 C7.2,2.449 6.72855,2 6.15,2 L6.15,2 Z M6.15,7 C7.88985,7 9.3,8.343 9.3,10 C9.3,11.657 7.88985,13 6.15,13 C4.41015,13 3,11.657 3,10 C3,8.343 4.41015,7 6.15,7 L6.15,7 Z M6.15,9 C5.57145,9 5.1,9.449 5.1,10 C5.1,10.551 5.57145,11 6.15,11 C6.72855,11 7.2,10.551 7.2,10 C7.2,9.449 6.72855,9 6.15,9 L6.15,9 Z M11.4,18 L24,18 L24,16 L11.4,16 L11.4,18 Z M11.4,4 L24,4 L24,2 L11.4,2 L11.4,4 Z M11.4,11 L24,11 L24,9 L11.4,9 L11.4,11 Z"
                      id="list-[#000]">
                    </path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className="text-sm">
            Showing {products.length} of {products.length} results
          </div>
        </div>
        <Select onValueChange={handleChangeSort}
        //  defaultValue={"expensive"}
        >
          <SelectTrigger className="w-[140px] text-black">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cheap">Cheap</SelectItem>
              <SelectItem value="expensive">Expensive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>
      <div className="flex flex-col gap-3">
        {sortedProducts.map((product) => {
          if (listFormat === "list") {
            return (
              <ListFormatProduct key={product.id} product={product}
                addToCart={addToCart}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                openProductDetails={openProductDetails}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {sortedProducts.map((product) => {
          if (listFormat === "tabs") {
            return (
              <TabFormatProduct key={product.id} product={product}
                addToCart={addToCart}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                openProductDetails={openProductDetails}
              />
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

interface ProductFormatProps {
  product: Product;
  addToCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
  openProductDetails: (product: Product) => void;
}

export function TabFormatProduct ({ product, addToCart, addToFavorites, removeFromFavorites, openProductDetails }: ProductFormatProps): JSX.Element {
  const discountPrice = (product.price * (100 - product.discount) / 100).toFixed(2);
  const imageMap: Record<Category, string> = {
    mug: webp.CoffeeMug,
    notebook: webp.professional_notebook,
    "t-shirt": webp.t_shirt,
  };
  const { favoriteItems } = useAppSelector((state) => state.favoriteCart);

  const currentFavorite = favoriteItems.find(({ id }) => product.id === id);

  function toggleFavorite (): void {
    if (!currentFavorite) {
      addToFavorites(product);
      return;
    }
    removeFromFavorites(product);
  }
  return (
    <div className="relative">
      <article className="border-gray-200 border-2 rounded-sm w-64 relative shadow-custom p-2"
        style={{
          filter: product.stock === 0 ? "opacity(0.5) blur(1px)" : "none",
          pointerEvents: product.stock === 0 ? "none" : "all",
        }}
      >
        <figure
          onClick={() => openProductDetails(product)}
          className="flex justify-center items-center p-1 bg-red-00 cursor-pointer hover:scale-110 transition-all duration-500">
          <img
            className="h-[250px] object-cover"
            src={imageMap[product.category]}
            alt={product.name}
          />
        </figure>
        <header>
          <h2 className="text-sm font-bold p-2">
            {product.name}
          </h2>
        </header>
        <p className="text-sm pl-2">
          {product.description}
        </p>
        <footer className="flex gap-2 p-2 ">
          <div className="text-lg">
            ${discountPrice}
          </div>
          {+discountPrice !== product.price
            ? (
              <div className="text-sm line-through text-gray-400">
                ${product.price}
              </div>
            )
            : null
          }
        </footer>
        <div className={"absolute bottom-3 right-3 bg-black text-white p-1 px-2 text-[12px] rounded-sm"}
          style={{
            cursor: product.stock === 0 ? "default" : "pointer",
          }}
          onClick={() => addToCart(product)}
        >
          Add to cart
        </div>
        <div className={"absolute top-3 right-4 bg-white p-2 text-[13px] rounded-full shadow-custom"}
          style={{
            cursor: product.stock === 0 ? "default" : "pointer",
          }}
          onClick={toggleFavorite}
        >
          <svg
            width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity={!currentFavorite ? "0" : "1"} d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
              fill="#000000"/>
            <path d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
              stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </article>
      {product.stock === 0
        ? (
          <div className="bg-black p-2 px-3 rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-lg">
            Out of stock
          </div>
        )
        : null}
    </div>
  );
}

export function ListFormatProduct ({ product, addToFavorites, addToCart, removeFromFavorites, openProductDetails }: ProductFormatProps): JSX.Element {
  const discountPrice = (product.price * (100 - product.discount) / 100).toFixed(2);
  const imageMap: Record<Category, string> = {
    mug: webp.CoffeeMug,
    notebook: webp.professional_notebook,
    "t-shirt": webp.t_shirt,
  };

  const { favoriteItems } = useAppSelector((state) => state.favoriteCart);

  const currentFavorite = favoriteItems.find(({ id }) => product.id === id);

  function toggleFavorite (): void {
    if (!currentFavorite) {
      addToFavorites(product);
      return;
    }
    removeFromFavorites(product);
  }
  return (
    <div className="relative">
      <article className="border-gray-200 border-2 rounded-sm flex relative shadow-custom"
        style={{
          filter: product.stock === 0 ? "opacity(0.5) blur(1px)" : "none",
          pointerEvents: product.stock === 0 ? "none" : "all",
        }}
      >
        <figure
          onClick={() => openProductDetails(product)}
          className="min-h-40 flex justify-center items-center p-2 pl-3 cursor-pointer hover:scale-110 transition-all duration-500">
          <img
            src={imageMap[product.category]}
            alt={product.name} className="w-24"
          />
        </figure>
        <div className="flex flex-col p-2">
          <header>
            <h2 className="text-sm font-bold">
              {product.name}
            </h2>
          </header>
          <p className="text-sm pt-2">
            {product.description}
          </p>
          <footer className="flex gap-2 pt-2">
            <div className="text-sm">
              ${discountPrice}
            </div>
            {+discountPrice !== product.price
              ? (
                <div className="text-sm line-through text-gray-400">
                  ${product.price}
                </div>
              )
              : null
            }
          </footer>
        </div>
        <div className={"absolute bottom-2 right-2 bg-black text-white p-1 px-2 text-[12px] rounded-sm"}
          style={{
            cursor: product.stock === 0 ? "default" : "pointer",
          }}
          onClick={() => addToCart(product)}
        >
          Add to cart
        </div>
        <div className={"absolute top-2 right-2 bg-white p-2 text-[13px] rounded-full shadow-custom"}
          style={{
            cursor: product.stock === 0 ? "default" : "pointer",
          }}
        >
          <svg
            onClick={toggleFavorite}
            width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity={!currentFavorite ? "0" : "1"} d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
              fill="#000000"/>
            <path d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
              stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </article>
      {product.stock === 0
        ? (
          <div className="bg-black p-2 px-3 rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-lg">
            Out of stock
          </div>
        )
        : null}
    </div>
  );
}
