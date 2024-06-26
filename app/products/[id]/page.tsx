import React, { cache } from "react";
import prisma from "@/lib/db/prisma";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PriceTag from "@/components/PriceTag";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
interface ProductPageProps {
  params: {
    id: string;
  };
}
const getProduct = cache(async (id: string) => {
  const product = await prisma?.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) notFound();
  return product;
});
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + "  - MegStorm",
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
}
async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <section className="section">
      <div className="flex flex-col lg:flex-row gap-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
          priority
        />
        <div className="mt-5">
          <h2 className="text-5xl font-bold">{product.name}</h2>
          <PriceTag price={product.price} className="mt-4 " />
          <p className="py-6">{product.description}</p>
          <AddToCartButton
            text="Add to Cart"
            productId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
