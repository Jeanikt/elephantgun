import { Suspense } from "react";
import ProductCatalog from "./ProductCatalog";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductCatalog />
    </Suspense>
  );
}
