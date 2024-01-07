"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function LoginPage() {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (event: FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    signIn("credentials", {
      ...state,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.refresh();
        }

        if (callback?.error) {
          toast.error("Invalid Credentials");
          throw new Error("Wrong Credentials");
        }
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
    toast.success("Login Successful");
    router.push("/");
  };

  function handleChange(event: any) {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(event.target.value);
  }
  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-2xl shadow-lg shadow-white max-w-3xl p-5">
        {/* Form */}
        <Card className="sm:w-1/2 border-none  rounded-2xl ">
          <CardHeader>
            <CardTitle className="text-black">Sign In</CardTitle>
            <CardDescription className="text-black">
              Enter your details to sign in.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <form className="flex flex-col" onSubmit={onSubmit}>
              <div className="mb-4 flex flex-col gap-6">
                <Label htmlFor="email" className="text-black ">
                  Email
                </Label>
                <Input
                  className="p-2 rounded-xl border border-black text-black "
                  id="Email"
                  value={state.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                />
                <Label htmlFor="password" className="text-black">
                  Password
                </Label>
                <Input
                  className="p-2 rounded-xl border border-black text-black"
                  type="password"
                  id="Password"
                  value={state.password}
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <Button
                className="mt-6 text-black bg-black rounded-xl text-white hover:bg-gray-400"
                type="submit"
              >
                SIGN IN
              </Button>
              <div>
                <h4 className="mt-5 text-lg text-black flex justify-between">
                  Dont have an Account?
                  <Link
                    href="/register"
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    Sign up
                  </Link>
                </h4>
              </div>
            </form>
            <div className="mt-5 grid grid-cols-3 items-center text-gray-500">
              <hr className="outline-gray-900" />
              <p className="text-center text-black">OR </p>
              <hr className="outline-gray-500" />
            </div>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              size="lg"
              color="blue-gray"
              className="mt-5 py-2 w-full bg-gray-300 text-black rounded-xl hover:bg-gray-200"
            >
              <Image
                src="/google-symbol.png"
                width={20}
                height={20}
                alt="GOOGLE"
                className="mr-4"
              />
              Continue with Google
            </Button>
            <div className="p-2"></div>
            <Button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              size="lg"
              color="blue-gray"
              className=" py-2 w-full bg-black text-white rounded-xl hover:bg-gray-700"
            >
              <Image
                src="/github.png"
                width={20}
                height={20}
                alt="GITHUB"
                className="mr-4 bg-white rounded-full"
              />
              Continue with Github
            </Button>
          </CardContent>
        </Card>
        <div className="sm:block hidden w-1/2  ">
          <Image
            src={"/loginphoto.png"}
            alt=""
            width={500}
            height={500}
            className="ml-2 mt-5 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
