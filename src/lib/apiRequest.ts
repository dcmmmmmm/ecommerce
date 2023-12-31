// import { useRouter } from "next/navigation";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export async function makePostRequest(
  setIsLoading: any,
  endpoint: any,
  data: any,
  resourceName: any,
  reset: any,
  redirect: any
) {
  try {
    setIsLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setIsLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      redirect()
    } else {
      setIsLoading(false);
      if (response.status === 409) {
        toast.error("The Giving Warehouse Stock is NOT Enough");
      } else {
        toast.error("Something Went wrong");
      }
    }
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
}

export async function makePutRequest(
  setIsLoading: any,
  endpoint: any,
  data: any,
  resourceName: any,
  redirect: any,
) {
  try {
    setIsLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log(response);
      setIsLoading(false);
      toast.success(`${resourceName} Updated Successfully`);
      redirect();
    } else {
      setIsLoading(false);
      toast.error("Something Went wrong");
    }
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
}