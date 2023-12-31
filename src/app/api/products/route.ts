import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    console.log(productData)
    return  NextResponse.json(productData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create Product",error}, {status:500} )
  }
}