import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const {title, slug, imageUrl, description, isActive} = await request.json();

    const existingCategory = await prisma.categories.findUnique({
      where: {
        slug: slug,
      }
    })

    if(existingCategory) {
      return NextResponse.json({
        data: null, 
        message: "Category already exists"
      }, {status:409})
    }
    const newCategory = await prisma.categories.create({
      data: {
        title: title,
        slug: slug,
        imageUrl: imageUrl,
        description: description, 
        isActive: isActive,
      }
    } as any)
    console.log(newCategory)
    return  NextResponse.json(newCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create Category",error}, {status:500} )
  }
}
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to get Categories",error}, {status:500} )
  }
}