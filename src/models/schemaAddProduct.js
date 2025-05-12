import * as yup from 'yup';
export const inputs = [
    { name: "title", type: "text", placeholder: "Title Product" },
    { name: "description", type: "text", placeholder: " set Description" },
    { name: "price", type: "text", placeholder: "Price by EGP" },
    { name: "stock", type: "text", placeholder: "Enter  Stock Product" },
    { name: "brand", type: "text", placeholder: "Enter Brand" },
    { name: "category", type: "text", placeholder: "Enter category" },
];

export const schemaAddProduct = yup.object({
    title: yup
        .string()
        .required("Product title is required")
        .min(3, "Title must be at least 3 characters"),
    description: yup
        .string()
        .required("Product description is required")
        .min(10, "Description must be at least 10 characters"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be a positive number"),
    stock: yup
        .number()
        .typeError("Stock must be a number")
        .required("Stock is required")
        .integer("Stock must be an integer")
        .min(0, "Stock cannot be negative"),
    brand: yup
        .string()
        .required("Brand is required")
        .min(2, "Brand must be at least 2 characters"),
    category: yup
        .string()
        .required("Category is required")
        .min(2, "Category must be at least 2 characters"),
});
