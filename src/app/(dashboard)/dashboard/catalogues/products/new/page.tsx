"use client";
import ImageInput from "@/components/FormInput/ImageInput";
import SelectInput from "@/components/FormInput/SelectInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextareaInput from "@/components/FormInput/TextAreaInput";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import FormHeader from "@/components/dashboard/FormHeader";
import { Button } from "@/components/ui/button";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewProductPage() {
  const [imageUrl, setImageUrl] = useState("");
  const categories = [
    {
      id: 1,
      title: "Category 1",
    },
    {
      id: 2,
      title: "Category 2",
    },
  ];
  const suppliers = [
    {
      id: 1,
      title: "Category 1",
    },
    {
      id: 2,
      title: "Category 2",
    },
  ];
  // TAGS
  const [tags, setTags] = useState(["tag 1", "tag 2", "tag 3", "tag 4"]);
  const [tag, setTag] = useState("");
  const [showTagForm, setShowTagForm] = useState(false);
  function addTag() {
    setTags([...tags, tag]);
    setTag("");
  }
  function removeTag(index: any) {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }
  //TAGS end
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isActive: true } });
  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("http://localhost:3000/dashboard/catalogues/products");
  }
  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.tags = tags;
    console.log(data);
    makePostRequest(
      setIsLoading,
      "api/products",
      data,
      "Product",
      reset,
      redirect
    );
    setImageUrl("");
  }
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Product" />
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Product Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Product SKU"
            name="sku"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Product Barcode"
            name="barcode"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Product Price (Before Discount)"
            name="productPrice"
            register={register}
            errors={errors}
            type="number"
          />
          <TextInput
            label="Product Price (Discounted)"
            name="salePrice"
            register={register}
            errors={errors}
            type="number"
          />
          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            multiple={false}
          />
          <SelectInput
            label="Select Suppliers"
            name="supplierIds"
            register={register}
            errors={errors}
            className="w-full"
            options={suppliers}
            multiple={false}
          />
          <TextareaInput
            label="Product Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ToggleInput
            label="Active"
            name="isActive"
            trueTitle="Published"
            falseTitle="Not Published"
            register={register}
            errors={errors}
          />
          <ImageInput
            label="Product Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="ProductImageUploader"
          />
          {/* Tags (Input item array) */}
          <div className="sm:col-span-2">
            {showTagForm ? (
              <form className="flex items-center">
                <label htmlFor="voice-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 21 21"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                      />
                    </svg>
                  </div>
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    type="text"
                    id="voice-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Create Tags..."
                    required
                  />
                </div>
                <button
                  onClick={addTag}
                  type="button"
                  className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <Plus className="h-4 w-4 me-2" />
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowTagForm(false)}
                  className="ml-3 shrink-0 w-8 h-8 bg-red-700 rounded-xl flex items-center justify-center"
                >
                  <X className="w-4 h-4 " />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowTagForm(true)}
                type="button"
                className="flex items-center space-x-2 py-2 "
              >
                <Plus />
                <span>Add Tags</span>
              </button>
            )}
            <div className="flex flex-wrap gap-4 mt-4">
              {tags.map((item, i) => {
                return (
                  <div
                    onClick={() => removeTag(i)}
                    key={i}
                    className="flex space-x-2 items-center bg-slate-400 px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <p>{item}</p>
                    <X className="w-4 h-4" />
                  </div>
                );
              })}
            </div>
            {/* End Tags (Input item array) */}
          </div>
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle="Save Product"
          loadingButtonTitle="Creating Product please wait..."
        />
      </form>
    </div>
  );
}
