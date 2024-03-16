import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
export const metadata = {
  title: "Your Cart - MegStorm",
};

export default async function CartPage() {
  const cart = await getCart();
  return (
    <section className="section">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty</p>}

      <div className="flex flex-col items-end sm:items-center ">
        <p className="mb-3 font-bold">
          Total: {formatPrice((cart?.subtotal as number) || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">CHECKOUT</button>
      </div>
    </section>
  );
}
