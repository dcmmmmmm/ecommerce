"use client";
import ImageInput from "@/components/FormInput/ImageInput";
import SelectInput from "@/components/FormInput/SelectInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextareaInput from "@/components/FormInput/TextAreaInput";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import FormHeader from "@/components/dashboard/FormHeader";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCatagoryPage() {
  const [imageUrl, setImageUrl] = useState("");
  // const markets = [];
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
    router.push("http://localhost:3000/dashboard/catalogues/categories");
  }
  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    console.log(data);
    makePostRequest(
      setIsLoading,
      "api/categories",
      data,
      "Category",
      reset,
      redirect
    );
    setImageUrl("");
  }
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Category" />
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />
          {/* <SelectInput
            label="Select Market"
            name="MarketIds"
            register={register}
            errors={errors}
            className="w-full"
            options={markets}
            multiple={false}
          /> */}
          <TextareaInput
            label="Category Description"
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
            label="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="CategoryImageUploader"
          />
        </div>

        <SubmitButton
          isLoading={isLoading}
          ButtonTitle="Save Category"
          loadingButtonTitle="Creating Category please wait..."
        />
      </form>
    </div>
  );
}
