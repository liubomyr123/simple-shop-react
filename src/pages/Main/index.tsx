import { useAppSelector } from "@store";

import MainFilters from "./MainFilters";
import ListOfProducts from "./ListOfProducts";
import InfoSection from "@/components/InfoSection";

export default function Main (): JSX.Element {
  const { products } = useAppSelector((state) => state.products);

  if (!products.length) {
    return <div className="min-h-screen">Loading...</div>;
  }
  return (
    <main className="flex w-10/12 m-auto pt-2 flex-col">
      <div className="flex">
        <MainFilters products={products} />
        <ListOfProducts products={products} />
      </div>
      <InfoSection />
    </main>
  );
}
