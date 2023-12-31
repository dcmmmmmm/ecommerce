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
import { generateInitials } from "@/lib/generateUserCode";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewBannerPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [couponCode, setCouponCode] = useState();
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
    router.push("http://localhost:3000/dashboard/suppliers");
  }
  async function onSubmit(data: any) {
    data.imageUrl = imageUrl;
    console.log(data);
    makePostRequest(
      setIsLoading,
      "api/suppliers",
      data,
      "Supplier",
      reset,
      redirect
    );
    setImageUrl("");
  }
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Supplier" />
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Supplier Name"
            name="Name"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Contact Email"
            name="email"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Phone Number"
            name="phoneNumber"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Address"
            name="address"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Notes"
            name="notes"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Contact Person"
            name="contactPerson"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Supplier Contact Person Phone Number"
            name="contactPersonPhoneNumber"
            register={register}
            errors={errors}
          />
          <TextareaInput
            label="Supplier's Payment Terms"
            name="terms"
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
            label="Supplier Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="SupplierLogoUploader"
          />
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle="Save Supplier"
          loadingButtonTitle="Creating Supplier please wait..."
        />
      </form>
    </div>
  );
}
