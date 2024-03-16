import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function SearchProduct(FormData: FormData) {
  "use server";
  const searchQuery = FormData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  const cart = await getCart();

  return (
    <header className="header bg-base-100 z-50 ">
      <nav className="wrapper flex justify-between items-center p-3">
        <div>
          <Link href={"/"}>
            <h2 className="font-bold font-[Roboto] text-xl">
              <span className="text-primary">Meg</span>Storm
            </h2>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-none gap-2 -ml-auto">
            <form action={SearchProduct}>
              <div className="form-control">
                <input
                  type="text"
                  name="searchQuery"
                  placeholder="Search"
                  className="input w-full min-w-[100px] "
                />
              </div>
            </form>
          </div>
          <div className="relative">
            <ShoppingCartButton cart={cart} />
          </div>
          <div className="relative">
            <UserMenuButton session={session} />
          </div>
        </div>
      </nav>
    </header>
  );
}
