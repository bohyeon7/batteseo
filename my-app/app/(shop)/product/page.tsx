import { Suspense } from "react";
import Product from "./product";

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Fallback Loading...</div>}>
      <Product />
    </Suspense>
  )
}