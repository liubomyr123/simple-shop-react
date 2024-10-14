import { useAppDispatch, useAppSelector } from "@store";
import type { CartProduct, Category } from "@shared";
import { useTypedNavigate, webp } from "@shared";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { clearCart, removeProductFromCart, updateQuantity } from "@app/store/slices/shopping-cart";

export default function ShoppingCart (): JSX.Element {
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const DELIVERY_CHARGE = 5;
  const [open, setOpen] = useState(false);
  const navigate = useTypedNavigate();

  const [subTotal, setSubTotal] = useState(0);

  const subGrandTotal = subTotal + DELIVERY_CHARGE;
  const [grandTotal, setGrandTotal] = useState(subGrandTotal);
  const [discountCode, setDiscountCode] = useState("");
  const [isApplyDiscount, setIsApplyDiscount] = useState(false);

  function applyDiscountCode (): void {
    if (discountCode === "111") {
      setIsApplyDiscount(true);
      setGrandTotal(() => subGrandTotal * 0.9);
    } else {
      setIsApplyDiscount(false);
      setGrandTotal(() => subGrandTotal);
    }
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    let subTotal = 0;
    for (const cartItem of cartItems) {
      const subPrice = cartItem.quantity * cartItem.price;
      subTotal += subPrice;
    }
    setSubTotal(subTotal);
  }, [cartItems]);

  function processedToCheckout (): void {
    if (!cartItems.length) {
      return;
    }
    setOpen(true);
    dispatch(clearCart());
  }
  return (
    <main className="flex w-10/12 m-auto flex-col p-3 py-8 min-h-screen">
      <div className="text-2xl">Checkout</div>
      <div className="py-2 flex gap-10">
        <CheckoutCartTable cartItems={cartItems} />
        <div className="bg-red-00 border-2 border-gray-200 rounded-sm p-4 w-[500px] gap-3 flex flex-col text-sm h-max">
          <div className="flex bg-red-00 justify-between font-bold text-lg">
            <div>
              Subtotal
            </div>

            <div>
              ${subTotal.toFixed(2)}
            </div>
          </div>
          <hr className="border-gray-200" />
          <div className="font-thin flex flex-col gap-2">

            <div className="flex flex-col gap-1">
              <div className="text-xs">
                Enter Discount Code (-10%)
              </div>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Code..."
                  className="border-black"
                  style={{
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                  type="submit"
                  style={{
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                  }}
                  onClick={applyDiscountCode}
                >
                  Apply
                </Button>
              </div>
            </div>

            <div className="flex bg-red-00 justify-between">
              <div className="">
                Delivery Charge
              </div>
              <div>
                ${DELIVERY_CHARGE}.00
              </div>
            </div>
          </div>
          <hr className="border-gray-200" />
          <div className="flex bg-red-00 flex-col font-bold text-lg mb-1">
            <div className="flex gap-3 justify-between">
              <div>
                Grand Total
              </div>
              <div className="flex flex-col">
                ${grandTotal.toFixed(2)}
              </div>
            </div>
            <div className="font-thin text-sm text-right">
              = ${subTotal.toFixed(2)} + ${DELIVERY_CHARGE} {isApplyDiscount ? "-10%" : ""}
            </div>
          </div>
          <div className="bg-black text-white p-4 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={processedToCheckout}
          >
            Processed to Checkout
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[350px]">
          <DialogHeader>
            <div className="bg-red-00 flex justify-center items-center pb-6 pt-3">
              <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="#000" strokeWidth="1.5"/>
                <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="#000" strokeWidth="1.5"/>
                <path d="M11 10.8L12.1429 12L15 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                  stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <DialogTitle className="text-center">Your order is confirmed</DialogTitle>
            <DialogDescription className="pt-3 text-center">
              Thanks for shopping! Your order has not shipped yet,
              but we will send you email when it done.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-00">
            <div className="flex flex-col gap-2">
              <div
                onClick={() => navigate("/profile")}
                className="bg-black text-sm text-white p-3 rounded-lg flex items-center justify-center cursor-pointer">
                View order
              </div>
              <div
                onClick={() => navigate("/")}
                className="bg-white text-sm text-black border-black border-2 p-3 rounded-lg flex items-center justify-center cursor-pointer">
                Go back to home
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function CheckoutCartTable ({ cartItems }: { cartItems: CartProduct[]; }): JSX.Element {
  const imageMap: Record<Category, string> = {
    mug: webp.CoffeeMug,
    notebook: webp.professional_notebook,
    "t-shirt": webp.t_shirt,
  };
  const dispatch = useAppDispatch();

  function removeFromCart (product: CartProduct): void {
    dispatch(removeProductFromCart({ productId: product.id }));
  }
  function updateProductQuantity (product: CartProduct, operationType: "add" | "remove"): void {
    dispatch(updateQuantity({ productId: product.id, quantity: operationType === "add" ? 1 : -1 }));
    // console.log("product", product);
    if (product.quantity + (operationType === "add" ? 1 : -1) === product.stock) {
      toast("Max amount for this product");
    }
  }
  console.log("cartItems", cartItems);

  return (
    <div className="w-full relative">

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[]">Product</TableHead>
            <TableHead className="w-[]">Price</TableHead>
            <TableHead className="w-[]">Quantity</TableHead>
            <TableHead className="">Subtotal</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium bg-red-00">
                <div className="flex gap-2">
                  <figure className="">
                    <img
                      src={imageMap[product.category]}
                      alt={product.name} className="w-16 bg-green-00"
                    />
                  </figure>
                  <div className="flex flex-col p-2">
                    <div className="font-bold">
                      {product.name}
                    </div>
                    {product.selectedSize
                      ? (
                        <div className="font-light">
                        Size: {product.selectedSize}
                        </div>
                      )
                      : null}
                    {product.selectedColor
                      ? (
                        <div className="font-light flex items-center gap-2">
                        Color: {product.selectedColor}
                          <div className="w-3 h-3 rounded-sm " style={{ backgroundColor: product.selectedColor, border: "1px dashed grey" }}></div>
                        </div>
                      )
                      : null}
                  </div>
                </div>
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <div className="flex border-2 bg-slate-00 border-black rounded-sm w-max p-1 px-3 gap-3 items-center">
                  <div className="text-xl cursor-pointer" onClick={() => updateProductQuantity(product, "remove")}>
                  -
                  </div>
                  <div className="text-sm px-3 bg-red-00">
                    {product.quantity}
                  </div>
                  <div className="text-xl cursor-pointer" onClick={() => updateProductQuantity(product, "add")}>
                  +
                  </div>
                </div>
              </TableCell>
              <TableCell className="">${product.price * product.quantity}</TableCell>
              <TableCell className="bg-red-00 flex justify-center items-center mt-3">
                <svg onClick={() => removeFromCart(product)} className="cursor-pointer" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                    stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        !cartItems.length
          ? (
            <div className="bg-red-00 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              No items added
            </div>
          )
          : null
      }
    </div>
  );
}
