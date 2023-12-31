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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function NewCatagoryPage() {
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
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { isActive: true } });

  // Quill editor
  const [content, setContent] = useState("");
  //Custom Tool Bar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];
  // Quill editor end

  const isActive = watch("isActive");
  const router = useRouter();
  function redirect() {
    router.push("http://localhost:3000/dashboard/community");
  }
  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;
    console.log(data);
    makePostRequest(
      setIsLoading,
      "api/trainings",
      data,
      "Training",
      reset,
      redirect
    );
    setImageUrl("");
    setContent("");
  }
  return (
    <div>
      {/* Form Header */}
      <FormHeader title="New Training" />
      {/* Form Container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6
      md:p-8 dark:bg-slate-900 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-4">
          <TextInput
            label="Training Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryIds"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            multiple={false}
          />
          <TextareaInput
            label="Training Description"
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
            label="Training Thumbnail"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="TrainingThumbnailUploader"
          />
          {/* content */}
          <div className="sm:col-span-2">
            <label
              htmlFor="content"
              className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Training Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
            />
          </div>
          {/* content end */}
        </div>

        <SubmitButton
          isLoading={isLoading}
          ButtonTitle="Save Training"
          loadingButtonTitle="Creating Training please wait..."
        />
      </form>
    </div>
  );
}
