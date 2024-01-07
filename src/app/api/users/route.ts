import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb"
import { Prisma } from "@prisma/client";


export async function POST(
  request: NextRequest, 
) {
  try {
    const { 
      name,
      email,
      password,
     } = await request.json() ;
  
     const existingUser = await prisma.user.findUnique({
      where: {
        email:email,
      }
     })
  
     if(existingUser) {
      return NextResponse.json({
        data: null,
        message: "User Already Exists"
      }, {status:409})
     }
  
  
     const hashedPassword = await bcrypt.hash(password, 12);
  
     const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
      } as any
    });
  
    console.log(newUser);
    return NextResponse.json({
      data: newUser,
      message:"Successfully Created User",
    }, {status: 409}) 
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        console.log(error);
        return NextResponse.json({
          error,
          message: "Server Error: Something went wrong"}, {status:500} )
        }
    }
    throw error
  }
}
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to get Coupon",error}, {status:500} )
  }
}