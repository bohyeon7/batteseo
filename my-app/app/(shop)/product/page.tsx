import { Suspense } from "react";
import Product from "./product";

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  )
}