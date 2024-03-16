import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import PriceTag from "./PriceTag";
interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <section className="section">
      <aside>
        <Link
          href={`/products/${product.id}`}
          className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
        >
          <div className="">
            <figure>
              <Image
                src={product.imageUrl}
                width={800}
                height={400}
                className=""
                alt={product.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.name}
                {isNew && <div className="badge badge-secondary">New</div>}
              </h2>
              <p>{product.description}</p>
              <PriceTag price={product.price} />
            </div>
          </div>
        </Link>
      </aside>
    </section>
  );
};

export default ProductCard;
