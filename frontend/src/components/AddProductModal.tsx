import { PlusCircleIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore"

function AddProductModal() {
  const { formData, setFormData, loading } = useProductStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useProductStore.getState().addProduct();
  }

  return (
    <dialog id="add_product_modal" className="modal">
        <div className="modal-box">
            <button 
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => (document.getElementById("add_product_modal") as HTMLDialogElement | null)?.close()}
                >✕
            </button>
            <h3 className="font-bold text-xl mb-8">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6">
                    <div className="form-control">
                        <div className="flex flex-col mb-5">
                            <label>Product Name</label>
                            <input 
                                className="input input-bordered w-full focus:input-primary transition-colors duration-200"
                                type="text"
                                placeholder="Enter product name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col mb-5">
                            <label>Image URL</label>
                            <input 
                                className="input input-bordered w-full focus:input-primary transition-colors duration-200"
                                type="text"
                                placeholder="Enter image address"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col mb-5">
                            <label>Price</label>
                            <input 
                                className="input input-bordered w-full focus:input-primary transition-colors duration-200"
                                type="text"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-ghost">Cancel</button>
                    </form>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!formData.name || !formData.image || !formData.price || loading}
                    >
                        {loading ? (
                           <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <>
                                <PlusCircleIcon />
                                Add Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    </dialog>
  )
}

export default AddProductModal