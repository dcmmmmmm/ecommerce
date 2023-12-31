"use client";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";
import FormHeader from "@/components/dashboard/FormHeader";
import { makePostRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateIsoFormattedDate } from "@/lib/generateISOFormattedDate";
import { generateSlug } from "@/lib/generateSlug";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCouponPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState();
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
    router.push("http://localhost:3000/dashboard/catalogues/coupons");
  }

  async function onSubmit(data: any) {
    const couponCode = generateCouponCode(data.title, data.expireDate);
    const isoFormattedDate = generateIsoFormattedDate(data.expireDate);
    data.couponCode = couponCode;
    data.expireDate = isoFormattedDate;
    console.log(data);
    makePostRequest(
      setIsLoading,
      "api/coupons",
      data,
      "Coupon",
      reset,
      redirect
    );
  }
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Coupon" />
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Coupon Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Coupon Expire Date"
            name="expireDate"
            register={register}
            errors={errors}
            className="w-full"
            type="date"
          />
          <ToggleInput
            label="Active"
            name="isActive"
            trueTitle="Published"
            falseTitle="Not Published"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton
          isLoading={isLoading}
          ButtonTitle="Save Coupon"
          loadingButtonTitle="Creating Coupon please wait..."
        />
      </form>
    </div>
  );
}
