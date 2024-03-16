import React from "react";
import prisma from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";
interface searchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: searchPageProps): Metadata {
  return {
    title: `Search ${query} - MegStorm`,
  };
}
export default async function page({
  searchParams: { query },
}: searchPageProps) {
  const products = await prisma?.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },

    orderBy: { id: "desc" },
  });
  if (products.length === 0) {
    return <div className="text-center">No products Found</div>;
  }
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
