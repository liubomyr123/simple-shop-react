import type { Category, Colors, Product, Sizes } from "../types/Product";
import { colors, sizes } from "../types/Product";

interface FilterCategories {
  id: string;
  header: string;
  checkboxes: Array<{
    id: Category;
    title: string;
  }>;
}

interface FilterPrice {
  id: string;
  header: string;
  slider: {
    min: number;
    max: number;
  };
}

interface FilterColor {
  id: string;
  header: string;
  colors: Array<{
    id: Colors;
    amount: number;
  }>;
}

interface FilterSizes {
  id: string;
  header: string;
  sizes: Array<{
    id: Sizes;
    amount: number;
  }>;
}

type IconColorMap = Record<typeof colors[number], string>;

export function prepareFilters (products: Product[]): {
  filterCategories: FilterCategories;
  filterPrice: FilterPrice;
  filterColor: FilterColor;
  filterSizes: FilterSizes;
  iconColorMap: IconColorMap;
} {
  const filterCategories: FilterCategories = {
    id: "item-1",
    header: "Categories",
    checkboxes: [
      {
        id: "notebook",
        title: "Notebook",
      },
      {
        id: "t-shirt",
        title: "T-shirt",
      },
      {
        id: "mug",
        title: "Mug",
      },
    ],
  };

  const filterPrice: FilterPrice = {
    id: "item-2",
    header: "Filter by Price",
    slider: {
      min: 0,
      max: 0,
    },
  };

  const filterColor: FilterColor = {
    id: "item-3",
    header: "Filter by Color",
    colors: [
      {
        id: "white",
        amount: 0,
      },
      {
        id: "grey",
        amount: 0,
      },
      {
        id: "brown",
        amount: 0,
      },
      {
        id: "navy",
        amount: 0,
      },
      {
        id: "black",
        amount: 0,
      },
      {
        id: "blue",
        amount: 0,
      },
      {
        id: "silver",
        amount: 0,
      },
      {
        id: "red",
        amount: 0,
      },
      {
        id: "green",
        amount: 0,
      },
      {
        id: "yellow",
        amount: 0,
      },
      {
        id: "pink",
        amount: 0,
      },
    ],
  };

  const filterSizes: FilterSizes = {
    id: "item-4",
    header: "Filter by Size",
    sizes: [
      {
        id: "S",
        amount: 0,
      },
      {
        id: "M",
        amount: 0,
      },
      {
        id: "L",
        amount: 0,
      },
      {
        id: "XL",
        amount: 0,
      },
      {
        id: "XXL",
        amount: 0,
      },
      {
        id: "XXXL",
        amount: 0,
      },
      {
        id: "A4",
        amount: 0,
      },
      {
        id: "A5",
        amount: 0,
      },
    ],
  };

  if (products.length) {
    let maxPrice = 0;
    let minPrice = products?.[0]?.price || 0;

    for (const product of products) {
      if (product.price > maxPrice) {
        maxPrice = product.price;
      }
      if (product.price < minPrice) {
        minPrice = product.price;
      }

      for (const productColor of product.colors ?? []) {
        if (!colors.includes(productColor)) continue;

        filterColor.colors = filterColor.colors.map((filterColor) => {
          if (filterColor.id === productColor) {
            return {
              ...filterColor,
              amount: filterColor.amount + 1,
            };
          }
          return filterColor;
        });
      }

      for (const productSize of product.sizes ?? []) {
        if (!sizes.includes(productSize)) continue;

        filterSizes.sizes = filterSizes.sizes.map((filterSize) => {
          if (filterSize.id === productSize) {
            return {
              ...filterSize,
              amount: filterSize.amount + 1,
            };
          }
          return filterSize;
        });
      }
    }

    filterPrice.slider.min = minPrice;
    filterPrice.slider.max = maxPrice;
  }

  const iconColorMap: IconColorMap = {
    white: "text-black",
    grey: "text-white",
    brown: "text-white",
    navy: "text-white",
    black: "text-white",
    blue: "text-white",
    silver: "text-black",
    red: "text-white",
    green: "text-white",
    yellow: "text-black",
    pink: "text-black",
  };

  return {
    filterCategories,
    filterPrice,
    filterColor,
    filterSizes,
    iconColorMap,
  };
}
