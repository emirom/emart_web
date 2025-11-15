"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { postProducts } from "@lib/services/products/products";
import { CreateProductInput } from "@lib/schemas";

interface ProductFormData {
  name: string;
  enName: string;
  categoryId: string;
}

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  enName: z.string().min(1, "English name is required"),
  categoryId: z.string().min(1, "Category ID is required"),
});

const ProductForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      enName: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      const productRequest: CreateProductInput = {
        name: data.name,
        enName: data.enName,
        categoryId: data.categoryId,
        isActive: true,
      };

      const response = await postProducts(productRequest);

      toast.success("Product created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="name"
                type="text"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product name"
              />
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="enName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            English Name
          </label>
          <Controller
            name="enName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="enName"
                type="text"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.enName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter English name"
              />
            )}
          />
          {errors.enName && (
            <p className="mt-1 text-sm text-red-600">{errors.enName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category ID
          </label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="categoryId"
                type="text"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.categoryId ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter category ID"
              />
            )}
          />
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
