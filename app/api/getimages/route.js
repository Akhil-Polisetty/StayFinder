import ImageModel from "@/models/ImageModel"
import connectDB from "@/public/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
  
  

       await connectDB()
       const images = await ImageModel.find()
       if (!images) {
         return NextResponse.json({ message: 'Images not exists' }, { status: 400 })
       }
  
  
      return NextResponse.json({message:"succesfully fetched the images", data: images}, { status: 201 })
    } catch (err) {
      console.error('Error in verify-otp:', err)
      return NextResponse.json({ message: 'An error occurred while verifying OTP' }, { status: 500 })
    }
  }