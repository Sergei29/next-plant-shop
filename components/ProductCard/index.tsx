import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ProductShort } from "../../types"
import { displayPrice } from "../../lib"

type Props = {
  product: ProductShort
}

const ProductCard = ({ product }: Props): JSX.Element => {
  return (
    <div className="border w-64 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image
            src={product.picture.url}
            width={320}
            height={240}
            alt={product.title}
          />
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <span>{displayPrice(product.price)}</span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProductCard
