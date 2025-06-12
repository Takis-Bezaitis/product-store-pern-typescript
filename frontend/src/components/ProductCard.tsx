import { EditIcon, Trash2Icon } from "lucide-react";
import type { Product } from "../types/types"
import { Link } from "react-router";
import { useProductStore } from "../store/useProductStore";

function ProductCard({product}: {product: Product}) {
  const { deleteProduct } = useProductStore();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 m-3">
        <figure>
            <img 
                src={`${product.image}`} 
                alt={product.name}
                className="w-full h-full object-cover"
            />
        </figure> 
        <div className="card-body">
            <h2 className="card-title text-lg font-semibold">{product.name}</h2>
            <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
        </div>
        <div className="card-actions justify-end mt-4 mb-6 mr-3">
            <Link to={`product/${product.id}`} className="btn btn-sm btn-info btn-outline">
                <EditIcon />
            </Link>
            <button className="btn btn-sm btn-error btn-outline" 
                    onClick={() => deleteProduct(product.id)}>
                <Trash2Icon />
            </button>
        </div>
    </div>
  )
}

export default ProductCard;