import connectDB from "@/public/db";
import ImageModel from "@/models/ImageModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB(); // Ensure the database connection is established

    const { images } = await req.json(); // Expect an array of images
    console.log("The type of the data is ", typeof images);
    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { message: "Images are required" },
        { status: 400 }
      );
    }

    // Log images to verify the format
    // console.log("Received images:", images);

    // Save all images in one record
    const record = new ImageModel({
      data: images, // Ensure 'images' is an array of strings
    });
    const savedRecord = await record.save();

    return NextResponse.json(
      {
        message: "Images uploaded successfully",
        // record: savedRecord,
      },
      {
        status: 201
      }
    );
  } catch (error) {
    console.error("Error uploading images:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
