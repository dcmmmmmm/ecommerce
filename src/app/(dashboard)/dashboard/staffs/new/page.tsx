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

export default function NewStaffPage() {
  const [imageUrl, setImageUrl] = useState("");
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
    router.push("http://localhost:3000/dashboard/staffs");
  }
  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);
    const code = generateInitials(data.name);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.code = code;
    console.log(data);
    makePostRequest(setIsLoading, "api/staffs", data, "Staff", reset, redirect);
    setImageUrl("");
  }
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Staff" />
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Staff Name"
            name="Name"
            register={register}
            errors={errors}
          />
          <TextInput
            label="NIN (Id Number)"
            name="nin"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Staff Contact Email"
            name="email"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Staff Phone Number"
            name="phoneNumber"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Staff Address"
            name="address"
            register={register}
            errors={errors}
          />
          <TextareaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle="Save Staff"
          loadingButtonTitle="Creating Staff please wait..."
        />
      </form>
    </div>
  );
}
