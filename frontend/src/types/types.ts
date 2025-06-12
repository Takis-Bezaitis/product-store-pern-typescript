export type Product = {
    id: number;
    image: string;
    name: string;
    price: number;
}

export type ProductStore = {
    products: Product[];
    loading: boolean;
    error: string | null;
    currentProduct: Product | null;
    formData:  FormDataProps;
    fetchProducts: () => Promise<void>;
    fetchProduct: (id: number) => Promise<void>;
    addProduct: () => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    updateProduct: (id: number) => Promise<void>;
    setFormData: (formData: FormDataProps) => void;
    resetForm: () => void;
}

export type FormDataProps = {
    image: string;
    name: string;
    price: string;
}