import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const {title, couponCode, expireDate, isActive} = await request.json();


    const newCoupon = await prisma.coupons.create({
      data:{
        title: title,
        couponCode: couponCode,
        expireDate: expireDate,
        isActive: isActive
      }
    });
    console.log(newCoupon)
    return  NextResponse.json(newCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create Coupon",error}, {status:500} )
  }
}

export async function GET(request: NextRequest) {
  try {
    const coupons = await prisma.coupons.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(coupons)
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to get Coupon",error}, {status:500} )
  }
}