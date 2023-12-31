import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const {title, slug, categoryId, imageUrl, description, isActive, content} = await request.json();
    const newTraining = prisma.trainings.create({
      data:{
        title: title,
        slug: slug,
        categoryId: categoryId,
        imageUrl: imageUrl,
        description: description,
        isActive: isActive,
        content: content
      }
    })

    console.log(newTraining)
    return  NextResponse.json(newTraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create training",error}, {status:500} )
  }
}