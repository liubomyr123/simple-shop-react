import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { prepareFilters } from "@shared";
import type { Category, Colors, Product, Sizes } from "@shared";
import { useState } from "react";

interface MainFiltersProps {
  products: Product[];
}

export default function MainFilters ({ products }: MainFiltersProps): JSX.Element {
  const {
    filterCategories,
    filterPrice,
    filterColor,
    filterSizes,
    iconColorMap,
  } = prepareFilters(products);

  const [priceSliderValue, setPriceSliderValue] = useState([filterPrice.slider.min, filterPrice.slider.max]);

  const [checkedColors, setCheckedColors] = useState(() => {
    const result: Partial<Record<Colors, boolean>> = {};
    for (const filterColorColor of filterColor.colors) {
      result[filterColorColor.id] = true;
    }
    return result;
  });

  const [checkedSizes, setCheckedSizes] = useState(() => {
    const result: Partial<Record<Sizes, boolean>> = {};
    for (const filterSizesSize of filterSizes.sizes) {
      result[filterSizesSize.id] = true;
    }
    return result;
  });

  const [checkedCategories, setCheckedCategories] = useState(() => {
    const result: Partial<Record<Category, boolean>> = {};
    for (const filterCategory of filterCategories.checkboxes) {
      result[filterCategory.id] = true;
    }
    return result;
  });

  const handlePriceChange = (value: number[]): void => {
    setPriceSliderValue(value);
  };

  const handleCheckboxColorChange = (id: Colors): void => {
    setCheckedColors((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckboxSizeChange = (id: Sizes): void => {
    setCheckedSizes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCheckboxCategoryChange = (id: Category): void => {
    setCheckedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [openItems, setOpenItems] = useState([
    filterCategories.id,
    filterPrice.id,
    filterColor.id,
    filterSizes.id,
  ]);

  const toggleItem = (id: string): void => {
    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <section className="w-1/4 px-3 max-w-60">
      <Accordion type="multiple"
        value={openItems}
      >

        <AccordionItem value={filterCategories.id}>
          <AccordionTrigger onClick={() => toggleItem(filterCategories.id)} className="font-bold">{filterCategories.header}</AccordionTrigger>
          <AccordionContent>
            {filterCategories.checkboxes.map(({ id, title }) => {
              return (
                <label id={id} key={id} className="flex gap-2 items-center cursor-pointer">
                  <Checkbox id={id}
                    checked={!!checkedCategories[id]}
                    onCheckedChange={() => handleCheckboxCategoryChange(id)}
                  />
                  <span>{title}</span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={filterPrice.id}>
          <AccordionTrigger onClick={() => toggleItem(filterPrice.id)} className="font-bold">{filterPrice.header}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <div>Price: ${priceSliderValue?.[0] || filterPrice.slider.min} - ${priceSliderValue?.[1] || filterPrice.slider.max}</div>
            <Slider
              value={priceSliderValue}
              onValueChange={handlePriceChange}
              defaultValue={[filterPrice.slider.min, filterPrice.slider.max]}
              max={filterPrice.slider.max} min={filterPrice.slider.min}
              step={1}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={filterColor.id}>
          <AccordionTrigger onClick={() => toggleItem(filterColor.id)} className="font-bold">{filterColor.header}</AccordionTrigger>
          <AccordionContent>
            {filterColor.colors.map(({ id, amount }) => {
              return (
                <label id={id} key={id} className="flex gap-2 items-center justify-between cursor-pointer">
                  <div className="flex justify-center items-center gap-2">
                    <Checkbox
                      iconColor={iconColorMap[id]}
                      id={id}
                      checked={!!checkedColors[id]}
                      onCheckedChange={() => handleCheckboxColorChange(id)}
                      className={`checkbox-${id} data-[state=unchecked]:bg-white`}
                    />
                    <span>{id}</span>
                  </div>
                  <span>({amount})</span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={filterSizes.id}>
          <AccordionTrigger onClick={() => toggleItem(filterSizes.id)} className="font-bold">{filterSizes.header}</AccordionTrigger>
          <AccordionContent>
            {filterSizes.sizes.map(({ id, amount }) => {
              return (
                <label id={id} key={id} className="flex gap-2 items-center justify-between cursor-pointer">
                  <div className="flex justify-center items-center gap-2">
                    <Checkbox id={id}
                      checked={!!checkedSizes[id]}
                      onCheckedChange={() => handleCheckboxSizeChange(id)}
                    />
                    <span>{id}</span>
                  </div>
                  <span>({amount})</span>
                </label>
              );
            })}
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </section>
  );
}
