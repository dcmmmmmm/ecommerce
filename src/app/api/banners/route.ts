import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const {title, link, imageUrl, isActive} = await request.json();


    const newBanner = await prisma.banners.create({
      data:{
        title: title,
        link: link,
        imageUrl: imageUrl,
        isActive: isActive
      }
    });
    console.log(newBanner)
    return  NextResponse.json(newBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create Banner",error}, {status:500} )
  }
}

export async function GET(request: NextRequest) {
  try {
    const banners = await prisma.banners.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(banners)
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to get Banner",error}, {status:500} )
  }
}