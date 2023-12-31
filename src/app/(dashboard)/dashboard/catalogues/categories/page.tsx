import Heading from "@/components/dashboard/Heading";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  FileDown,
  FileUp,
  Import,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoryPage = () => {
  return (
    <div>
      {/* Header */}
      <PageHeader
        header={"Categories"}
        href={"/dashboard/catalogues/categories/new"}
        LinkTitle={"Add Category"}
      />
      {/* Table Actions */}
      {/* Export // Search // Bulk Delete */}
      <div className="flex justify-between py-6 px-8 bg-white dark:bg-slate-800 rounded-xl items-center">
        {/* Search */}
        <div className=" w-full h-auto p-5 rounded-3xl bg-gray-300 dark:bg-gray-500">
          <section className="w-full flex items-center">
            <Button>
              <Search />
            </Button>
            <Input
              type="text"
              className="w-full h-full font-medium border-none md:pl-2"
              placeholder="Search Categories..."
            />
          </section>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4  ">
        {/* Export */}
        <Button className="bg-green-700 rounded-xl text-white hover:bg-green-600 ">
          <FileUp className="mr-2" />
          <span className="">Export</span>
        </Button>
        {/* Import */}
        <Button className="bg-orange-700 rounded-xl text-white hover:bg-orange-600 ">
          <FileDown className="mr-2" />
          <span>Import</span>
        </Button>
        {/* Delete */}
        <Button className="bg-red-700 rounded-xl text-white hover:bg-red-600">
          <Trash className="mr-2" />
          <span>Delete</span>
        </Button>
      </div>
      {/* Table */}
      <div className="pt-4">CategoryPage</div>
    </div>
  );
};

export default CategoryPage;
