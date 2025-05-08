import React from "react";
import { useForm } from "react-hook-form";
import { addProduct } from "../services/Api";
import type { FormValues } from "../types/FormVlauesType";
import { ToastContainer, toast } from "react-toastify";

const AddProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("productName", data.name);
    formData.append("price", `${data.price}`);
    formData.append("description", data.description);
    if (data.image?.length) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await addProduct(formData);
      toast.success(response?.data?.message || "Product added successfully!");
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      toast.error(message || "Failed to process product.");
      console.error("[Add Product Error]:", message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Product Name</label>
          <input
            {...register("name", { required: "Product name is required." })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required.",
              min: { value: 0, message: "Price must be at least 0." },
            })}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required.",
            })}
            className="w-full border border-gray-300 px-3 py-2 rounded resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Image is required.",
              validate: {
                fileType: (files) =>
                  files?.[0]?.type.startsWith("image/") ||
                  "Only image files are allowed.",
              },
            })}
            className="w-full border border-gray-300 px-3 py-2 rounded bg-white"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-black"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
};

export default AddProductForm;
