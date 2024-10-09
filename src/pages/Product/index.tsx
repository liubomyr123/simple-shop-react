import { useParams } from "react-router-dom";

interface ProductParamTypes {
  [key: string]: string | undefined;
  productId: string;
}

export default function Product (): JSX.Element {
  const params = useParams<ProductParamTypes>();

  console.log(params.productId);
  return (
    <div>
      <h2>Product</h2>
    </div>
  );
}
