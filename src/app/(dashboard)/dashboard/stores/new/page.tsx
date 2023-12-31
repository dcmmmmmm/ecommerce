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

export default function NewStorePage() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    router.push("http://localhost:3000/dashboard/catalogues/categories");
  }
  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    console.log(data);
    makePostRequest(setIsLoading, "api/stores", data, "Store", reset, redirect);
    setImageUrl("");
  }
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Store" />
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Store Title"
            name="title"
            register={register}
            errors={errors}
          />
          <SelectInput
            label="Select Categories"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            multiple={true}
          />
          <TextareaInput
            label="Store Description"
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
            label="Store Logo"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="StoreLogoUploader"
          />
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle="Save Store"
          loadingButtonTitle="Creating Store please wait..."
        />
      </form>
    </div>
  );
}
