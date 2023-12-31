import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const {title, slug, imageUrl, description, isActive} = await request.json();

    const newStore = await prisma.stores.create({
      data:{
        title: title,
        slug: slug,
        imageUrl: imageUrl,
        description: description,
        isActive: isActive,
      }
    })
    
    console.log(newStore)
    return  NextResponse.json(newStore);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create Store",error}, {status:500} )
  }
}