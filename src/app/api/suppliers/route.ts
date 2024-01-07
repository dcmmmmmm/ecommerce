import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const {name, email, phoneNumber, imageUrl, address, notes, contactPerson, contactPersonPhoneNumber, profileImageUrl, terms, isActive} = await request.json();
    const newSupplier = prisma.suppliersProfile.create({
      data:{
        name :name, 
        email: email, 
        phoneNumber: phoneNumber, 
        imageUrl: imageUrl,
        address: address, 
        notes: notes, 
        contactPerson: contactPerson, 
        contactPersonPhoneNumber: contactPersonPhoneNumber, 
        profileImageUrl: profileImageUrl,
        terms: terms, 
        isActive: isActive
      }
    } as any)
    console.log(newSupplier)
    return  NextResponse.json(newSupplier);
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Failed to create Supplier",error}, {status:500} )
  }
}