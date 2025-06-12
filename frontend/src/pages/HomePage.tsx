import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  },[fetchProducts])

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex justify-between">
          <button className="btn btn-primary" 
            onClick={() => (document.getElementById("add_product_modal") as HTMLDialogElement | null)?.showModal()}>
            <PlusCircleIcon />
            Add Product
          </button>
          <button className="btn" onClick={fetchProducts}>
            <RefreshCwIcon />
          </button>
      </div>

      <AddProductModal />

      {error && <div className="alert alert-error btn-circle">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
    </div>
  )
}

export default HomePage