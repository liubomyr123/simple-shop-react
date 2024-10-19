import { useAppDispatch, useAppSelector } from "@/app/store";
import { type Colors, type Sizes, type Category, type Product } from "@shared";
import { classNames, webp } from "@shared";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { StarRateV1 } from "@/components/StarRate";
import InfoSection from "@/components/InfoSection";
import { addProductToCart } from "@/app/store/slices/shopping-cart";
import { toast } from "sonner";
import { addProductToFavorite, removeProductFromFavorite } from "@/app/store/slices/favorite-cart";

interface ProductParamTypes {
  [key: string]: string | undefined;
  productId: string;
}

const imageMap: Record<Category, string> = {
  mug: webp.CoffeeMug,
  notebook: webp.professional_notebook,
  "t-shirt": webp.t_shirt,
};

export default function ProductDetails (): JSX.Element {
  const params = useParams<ProductParamTypes>();
  const { products } = useAppSelector((state) => state.products);
  const [product, setProduct] = useState<null | Product>(null);
  const [selectedColor, setSelectedColor] = useState<null | Colors>(null);
  const [selectedSize, setSelectedSize] = useState<null | Sizes>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.shoppingCart);

  const { favoriteItems } = useAppSelector((state) => state.favoriteCart);

  useEffect(() => {
    const productId = params.productId;
    if (productId) {
      const product = products.find(({ id }) => id === +productId) ?? null;
      setProduct(product);
      setSelectedColor(product?.colors?.[0] ?? null);
      setSelectedSize(product?.sizes?.[0] ?? null);
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [params.productId, products]);

  if (loading) {
    return (
      <div className="min-h-screen"></div>
    );
  }

  if (!product) {
    return (
      <div className="bg-red-00 min-h-screen flex justify-center items-center flex-col">

        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"
          width="275px" height="312px" version="1.1" shapeRendering="geometricPrecision"
          textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 475 512.24"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"/>
            <path fill="#C28F60" d="M0 417.58l202.44 26.17c-5.92,-16.29 -9.15,-33.86 -9.15,-52.19 0,-42.23 17.12,-80.46 44.79,-108.13 27.67,-27.66 65.9,-44.78 108.12,-44.78 42.22,0 80.46,17.12 108.13,44.78 5.83,5.84 11.19,12.15 16.02,18.85l1.39 -261.39 -299.87 -40.89 -171.87 77.98 0 339.6z"/>
            <polygon fill="#AA7950" points="471.74,40.89 459.77,48.69 338.97,124.05 0,77.98 171.87,0 "/>
            <path fill="#D2A06D" d="M340.21 238.76l0 -112.76 131.53 -85.11 3.26 268.21c-5.96,-9.29 -12.9,-17.9 -20.67,-25.67 -27.67,-27.66 -65.91,-44.78 -108.13,-44.78 -2,0 -4,0.04 -5.99,0.11z"/>
            <polygon fill="#65472F" points="232.12,8.21 330.35,21.61 189.75,105.62 189.66,251.05 139.63,216.97 89.59,245.25 95.84,92.57 "/>
            <path fill="#EF4136" d="M346.2 270.87c66.66,0 120.69,54.03 120.69,120.69 0,66.65 -54.03,120.68 -120.69,120.68 -66.65,0 -120.68,-54.03 -120.68,-120.68 0,-66.66 54.03,-120.69 120.68,-120.69l0 0z"/>
            <path fill="#D13327" d="M293.97 369.34c-1.71,-1.67 -3.29,-3.12 -4.29,-4.56l0.17 0.16 24.42 24.42 -0.15 0.14 -20.15 -20.16zm107.8 -16.56l1.88 1.92c5.84,5.77 5.54,9.15 0.04,14.53l-24.39 24.38 -4.26 -4.25 24.53 -24.54c4.66,-4.55 5.59,-7.68 2.2,-12.04zm0.3 63.89l1.62 1.62c5.5,5.37 5.8,8.75 -0.04,14.53l-17.78 18.21c-5.47,5.64 -8.26,2.02 -12.7,-2.49l-24.4 -24.4 -24.55 24.55c-5.37,5.51 -8.76,5.81 -14.53,-0.03l-18.21 -17.78c-0.83,-0.81 -1.45,-1.55 -1.91,-2.25l16 15.62c5.78,5.84 9.16,5.54 14.54,0.04l24.54 -24.55 24.4 24.4c4.44,4.51 7.23,8.12 12.7,2.48l17.78 -18.21c4.77,-4.71 5.45,-7.83 2.54,-11.74z"/>
            <path fill="white" d="M289.85 364.94c-4.51,-4.44 -8.13,-7.23 -2.49,-12.71l18.21 -17.77c5.78,-5.84 9.16,-5.55 14.53,-0.04l24.55 24.55 24.4 -24.4c4.44,-4.51 7.23,-8.13 12.7,-2.49l17.78 18.21c5.84,5.78 5.54,9.16 0.04,14.54l-24.53 24.52 24.53 24.53c5.5,5.38 5.8,8.76 -0.04,14.53l-17.78 18.21c-5.47,5.64 -8.26,2.03 -12.7,-2.48l-24.4 -24.4 -24.55 24.55c-5.37,5.5 -8.75,5.8 -14.53,-0.04l-18.21 -17.78c-5.64,-5.47 -2.02,-8.26 2.49,-12.7l24.42 -24.42 -24.42 -24.41z"/>
          </g>
        </svg>

        <div className="text-2xl">
         Product not found
        </div>
      </div>
    );
  }

  const discountPrice = (product.price * (100 - product.discount) / 100).toFixed(2);
  const currentFavorite = favoriteItems.find(({ id }) => product.id === id);

  function addToCart (product: Product): void {
    const productInCart = cartItems.find(({ id }) => id === product.id);
    if (productInCart) {
      if (productInCart.quantity + quantity > productInCart.stock) {
        toast("Max amount for this product");
        return;
      }
    }
    dispatch(addProductToCart({
      product,
      quantity,
      selectedColor,
      selectedSize,
    }));
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

  function toggleFavorite (product: Product): void {
    if (!currentFavorite) {
      addToFavorites(product);
      return;
    }
    removeFromFavorites(product);
  }

  return (
    <main className="flex w-10/12 m-auto p-3 py-8 bg-green-00 flex-col gap-3">

      <section className="bg-red-00 flex w-full">
        <figure
          className="flex bg-blue-00 justify-center items-center p-3 px-20 bg-red-00 cursor-pointer hover:scale-110 transition-all duration-500">
          <img
            className="w-[500px]"
            src={imageMap[product.category]}
            alt={product.name}
          />
        </figure>
        <div className="bg-blue-00 w-full p-4 relative">
          <div className="text-4xl pb-3">
            {product.name}
          </div>
          <div className="text-lg">
            {product.description}
          </div>
          <div className="flex gap-2 py-2">
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
          </div>
          <div className="text-sm py-5 pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero beatae veniam incidunt, ipsa officia eius. Animi ipsum aliquam quisquam fugit ullam ipsam atque doloremque? Iusto rem quae cum id soluta.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero beatae veniam incidunt, ipsa officia eius. Animi ipsum aliquam quisquam fugit ullam ipsam atque doloremque? Iusto rem quae cum id soluta.
          </div>

          {product.colors?.length
            ? (
              <div className="flex flex-col gap-2">
                <div>
                  Color
                </div>
                <div className="flex gap-2">
                  {product.colors?.map((color) => {
                    return (
                      <div
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                          backgroundColor: color,
                          // border: color === selectedColor ? "3px solid red" : "2px solid " + "black",
                        }}
                        className="h-8 w-8 rounded-sm cursor-pointer border-2 border-black relative border-dashed"
                      >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            opacity: color === selectedColor ? "1" : "0",
                          }}
                        >
                          <svg width="15px" height="15px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="si-glyph si-glyph-checked">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <path d="M3.432,6.189 C3.824,5.798 4.455,5.798 4.847,6.189 L6.968,8.31 L13.147,2.131 C13.531,1.747 14.157,1.753 14.548,2.144 L16.67,4.266 C17.06,4.657 17.066,5.284 16.684,5.666 L7.662,14.687 C7.278,15.07 6.651,15.064 6.261,14.673 L1.311,9.723 C0.92,9.333 0.92,8.7 1.311,8.31 L3.432,6.189 Z"
                                fill={color === "white" ? "#000" : "#fff"} className="si-glyph-fill">
                              </path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            )
            : null}

          {product.sizes?.length
            ? (
              <div className="flex flex-col gap-2">
                <div>
                  Size
                </div>
                <div className="flex gap-2">
                  {product.sizes?.map((size) => {
                    return (
                      <div key={size}
                        style={{
                          backgroundColor: size === selectedSize ? "black" : "white",
                          color: size === selectedSize ? "white" : "black",
                        }}
                        onClick={() => setSelectedSize(size)}
                        className="h-8 w-8 rounded-sm bg- text- flex justify-center items-center cursor-pointer border-2 border-black"
                      >
                        {size}
                      </div>
                    );
                  })}
                </div>
              </div>
            )
            : null}

          <div className="flex bg-slate-00 justify-between py-2 mt-3">
            <div className="flex border-2 bg-slate-00 border-black rounded-sm w-max p-1 px-3 gap-3 items-center">
              <div className="text-xl cursor-pointer" onClick={() => {
                if (quantity === 1) {
                  return;
                }
                setQuantity((prev) => prev - 1);
              }
              }>
                  -
              </div>
              <div className="text-sm px-3 bg-red-00">
                {quantity}
              </div>
              <div className="text-xl cursor-pointer" onClick={() => {
                if (quantity === product.stock) {
                  toast("Max amount for this product");
                  return;
                }
                setQuantity((prev) => prev + 1);
              }
              }>
                  +
              </div>
            </div>

            <div
              onClick={() => addToCart(product)}
              className="bg-black text-sm text-white p-3 rounded-lg flex items-center justify-center cursor-pointer w-full mx-8">
                Add to cart
            </div>

            <div onClick={() => toggleFavorite(product)} className={"bg-white p-3 rounded-sm shadow-custom flex justify-center items-center cursor-pointer"}>
              <svg
                width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity={!currentFavorite ? "0" : "1"} d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
                  fill="#000000"/>
                <path d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
                  stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className={classNames("absolute top-2 right-2 p-2 rounded-sm text-sm ", {
            "bg-red-200": product.stock === 0,
            "bg-green-200": product.stock !== 0,
          })}>
            {product.stock !== 0
              ? (
                <div className="text-green-600">
                  In stock
                </div>
              )
              : (
                <div className="text-red-600">
                 Out of stock
                </div>
              )}
          </div>
        </div>
      </section>

      <section>
        <Tabs product={product} />
      </section>
      <InfoSection />
    </main>
  );
}

interface TabType {
  name: string;
  content: ReactNode;
}

// const mockText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt eveniet asperiores beatae cumque quae repudiandae sequi expedita eum architecto hic. Quidem dolores quaerat nemo pariatur modi aspernatur eum blanditiis repellat?";

function getDate (daysBefore: number): number {
  const date = new Date();
  date.setDate(date.getDate() - (daysBefore < 0 ? 0 : daysBefore));
  const timestamp = date.getTime();
  return timestamp;
}

const reviews = [
  {
    id: "review_1",
    name: "Mark Williams",
    stars: 5,
    date: getDate(22),
    short_description: "Excellent Product, I Love It",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et vero totam optio dicta dolorum a. Dolor quisquam, natus perferendis praesentium, nemo soluta harum incidunt illum tenetur unde consequuntur a? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et vero totam optio dicta dolorum a. Dolor quisquam, natus perferendis praesentium, nemo soluta harum incidunt illum tenetur unde consequuntur a?",
  },
  {
    id: "review_2",
    name: "Alexa Johnson",
    stars: 3,
    date: getDate(1),
    short_description: "Excellent Product, I Love It",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et vero totam optio dicta dolorum a. Dolor quisquam, natus perferendis praesentium, nemo soluta harum incidunt illum tenetur unde consequuntur a? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et vero totam optio dicta dolorum a. Dolor quisquam, natus perferendis praesentium, nemo soluta harum incidunt illum tenetur unde consequuntur a?",
  },
  {
    id: "review_3",
    name: "Jhon Doe",
    stars: 2,
    date: getDate(3),
    short_description: "Excellent Product, I Love It",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et vero totam optio dicta dolorum a. Dolor quisquam, natus perferendis praesentium, nemo soluta harum incidunt illum tenetur unde consequuntur a? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et vero totam optio dicta dolorum a. Dolor quisquam, natus perferendis praesentium, nemo soluta harum incidunt illum tenetur unde consequuntur a?",
  },
];

const Reviews = (): JSX.Element => {
  return (
    <div className="flex flex-col bg-blue-00 gap-2">
      {reviews.sort((a, b) => b.date - a.date).map(({ id, name, review, short_description, stars, date }) => {
        return (
          <div key={id} className="bg-green-00 border-b-2 border-gray-200">

            <div className="flex p-2">
              <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z"
                  stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
                  stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <div className="flex flex-col px-2">
                <div>
                  {name}
                </div>
                <StarRateV1 countStars={stars} isChangeable={false} itemSize={15} />
              </div>
            </div>

            <div className="bg-blue-00 px-3 py-2 font-bold">
              {short_description}
            </div>

            <div className="bg-blue-00 px-3 py-4">
              {review}
            </div>

            <div className="px-3 pb-2 flex gap-2">
              <div className="text-gray-400">
                Posted on
              </div>
              {new Date(date).toLocaleString("en-US", { year: "numeric", month: "long", day: "2-digit" })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Description = ({ product }: { product: Product; }): JSX.Element => {
  return (
    <div className="border-b-2 border-gray-200 pb-3 flex flex-col gap-3">
      {product.big_description.split("\n").map(text => {
        return (
          <p key={text}>
            {text.replace(/\n/g, "<br>")}
          </p>
        );
      })}
      {/* <br />
      {mockText} */}
    </div>
  );
};

const AdditionalInformation = ({ product }: { product: Product; }): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 px-2 pb-3 border-b-2 border-gray-200">

      <div className="bg-blue-00 flex gap-2 items-center">
        <div className="text-xl">
          Color:
        </div>
        <div className="flex gap-2 bg-slate-00">
          {product.colors?.map((color) => {
            return (
              <div key={color}>
                {color}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-00 flex gap-2 items-center">
        <div className="text-xl">
          Sizes:
        </div>
        <div className="flex gap-2">
          {product.sizes?.map((size) => {
            return (
              <div key={size}>
                {size}
              </div>
            );
          })}
        </div>
      </div>
      {/* {mockText} */}
    </div>
  );
};

export const Tabs = ({ product }: { product: Product; }): JSX.Element => {
  const tabs: TabType[] = [
    {
      name: "Description",
      content: <Description product={product} />,
    },
    {
      name: "Additional information",
      content: <AdditionalInformation product={product} />,
    },
    {
      name: "Reviews",
      content: <Reviews />,
    },
  ];

  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const handleClick = (tab: TabType): void => {
    setActiveTab(tab);
  };

  return (
    <div className={"overflow-hidden flex flex-col bg-red-00 min-h-52"}>
      <div className="flex gap-3 p-3">
        {tabs.map((tab) => {
          const { name } = tab;
          const isSelected = activeTab.name === name;

          return (
            <div
              key={name}
              className={classNames("relative", { selected: isSelected })}
            >
              <span
                className={classNames("px-3 py-2 block text-black cursor-pointer text-sm font-semibold", {
                  "opacity-100": isSelected,
                  "opacity-40": !isSelected,
                })}
                onClick={() => handleClick(tab)}
              >
                {name}
              </span>

              {isSelected && <motion.div layoutId={`indicator-${product.id}`} className="absolute bottom-0 left-0 right-0 h-1 rounded-sm bg-black" />}
            </div>
          );
        })}
      </div>

      <div className="flex-1 p-3 text-black h-full overflow-auto">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab.name || "empty"}
            variants={{
              initial: {
                y: 10,
                opacity: 0,
              },
              enter: {
                y: 0,
                opacity: 1,
              },
              exit: {
                y: -10,
                opacity: 0,
              },
            }}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{
              duration: 0.3,
            }}
          >
            {activeTab.content}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
