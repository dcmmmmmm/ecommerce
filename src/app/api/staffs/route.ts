import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const staffData = await request.json();
    
    console.log(staffData)
    return  NextResponse.json(staffData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create staff",error}, {status:500} )
  }
}