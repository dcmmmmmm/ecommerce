import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FormHeader({ title }: any) {
  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex items-center justify-between py-4 px-6 bg-white dark:bg-slate-900 rounded-xl shadow">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button className="" onClick={() => router.back()}>
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}
