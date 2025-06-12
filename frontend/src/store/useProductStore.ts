import { create } from "zustand";
import axios from "axios";
import type { FormDataProps, ProductStore } from "../types/types";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  formData: {
    name: "",
    price: "",
    image: ""
  },

  setFormData: (formData: FormDataProps) => set({ formData }),
  resetForm: () => set({ formData: {name: "", price: "", image: "" } }),

  fetchProducts: async () => {
    set({loading: true});
    try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        set({products: response.data.data, error:null});
    } catch (err) {
        set({error:"Something went wrong."})
    } finally {
        set({loading:false});
    }
  },

  fetchProduct: async (id: number) => {
    set({loading:true});
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function: ", error);
      set({currentProduct: null});
      toast.error("Something went wrong.");
    } finally {
      set({loading:false});
    }
  },

  addProduct: async () => {
    set({loading:true});
    try {
        const { formData } = get();
        await axios.post(`${BASE_URL}/api/products`, formData);
        await get().fetchProducts();
        get().resetForm();
        toast.success("Product added successfully.");
        (document.getElementById("add_product_modal") as HTMLDialogElement | null)?.close();
    } catch (error) {
        console.log("Error in addProduct function: ", error);
        toast.error("Something went wrong.");
    } finally {
        set({loading:false});
    }
  },

  deleteProduct: async (id: number) => {
    set({loading: true});
    try {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        set(prev => ({products: prev.products.filter(product => product.id !== id)}));
        toast.success("Product deleted successfully.");
    } catch (error) {
        console.log("Error in deleteProduct function: ", error);
        toast.error("Something went wrong.");
    } finally {
        set({loading:false});
    }
  },

  updateProduct: async (id: number) => {
    set({loading:true});
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({currentProduct: response.data.data});
      toast.success("Product updated successfully.");
    } catch (error) {
      console.log("Error in updateProduct function: ", error);
      toast.error("Something went wrong.");
    } finally {
      set({loading:false});
    }
  }

}));

