import { removeProductFromFavorite } from "@/app/store/slices/favorite-cart";
import type { Category, FavoriteProduct as FavoriteProductType } from "@shared";
import { webp } from "@shared";
import { useAppDispatch, useAppSelector } from "@store";
import { toast } from "sonner";

export default function Favorite (): JSX.Element {
  const { favoriteItems } = useAppSelector((state) => state.favoriteCart);

  console.log("favoriteItems", favoriteItems);
  return (
    <main className="flex w-10/12 m-auto flex-col p-3 py-8 min-h-screen">
      <div className="text-2xl">Favorite</div>

      <div className="flex flex-wrap items-center gap-3 pt-3">
        {favoriteItems.map((item) => {
          return (
            <FavoriteProduct key={item.id} product={item} />
          );
        })}
      </div>
      {
        !favoriteItems.length
          ? (
            <div className="bg-red-00 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              No items added
            </div>
          )
          : null
      }
    </main>
  );
}

interface FavoriteProductProps {
  product: FavoriteProductType;
}

export function FavoriteProduct ({ product }: FavoriteProductProps): JSX.Element {
  const discountPrice = (product.price * (100 - product.discount) / 100).toFixed(2);
  const imageMap: Record<Category, string> = {
    mug: webp.CoffeeMug,
    notebook: webp.professional_notebook,
    "t-shirt": webp.t_shirt,
  };
  const dispatch = useAppDispatch();

  function removeFromFavorites (product: FavoriteProductType): void {
    dispatch(removeProductFromFavorite({ productId: product.id }));
    toast("Product removed from favorites");
  }
  const isOutOfStock = product.stock === 0;
  return (
    <div className="relative">
      <article className="border-gray-200 border-2 rounded-sm w-64 relative shadow-custom p-2"
        style={{
          filter: isOutOfStock ? "opacity(0.5) blur(1px)" : "none",
          pointerEvents: isOutOfStock ? "none" : "all",
        }}
      >
        <figure className="flex justify-center items-center p-1">
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
        <div className={"absolute top-3 right-4 bg-white p-2 text-[13px] rounded-full shadow-custom"}
          style={{
            cursor: isOutOfStock ? "default" : "pointer",
          }}
        >
          <svg onClick={() => removeFromFavorites(product)} className="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
              stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </article>
      {isOutOfStock
        ? (
          <div className="bg-black p-2 px-3 rounded-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-lg">
            Out of stock
          </div>
        )
        : null}
    </div>
  );
}
