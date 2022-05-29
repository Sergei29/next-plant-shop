import React from "react"
import Link from "next/link"
import { ProductShort } from "../../types"
import { displayPrice } from "../../lib"

type Props = {
  product: ProductShort
}

const ProductCard = ({ product }: Props): JSX.Element => {
  return (
    <div className="border my-4 w-64 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <a>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://dummyimage.com/320x240" alt="dummy img" />
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
