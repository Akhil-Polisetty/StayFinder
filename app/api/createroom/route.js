import connectDB, { disconnectDB } from "@/public/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RoomModel from "@/models/RoomModel";

export async function POST(req) {
  try {
    const { ownerid, roomtype,allowedtype,address,rent,notes,pics,rating,city } = await req.json();


    await connectDB();

        console.log("Data entered safely");


        const newRoom = {
            ownerid: ownerid,
            roomtype: roomtype,
            allowedtype: allowedtype,
            address:address,
            rent:rent,
            notes:notes,
            pics:pics,
            rating:rating,
            city:city

          };


          console.log("New user is:", newRoom);
          await RoomModel.create(newRoom);
          console.log("Successfully inserted new Room");

        console.log(ownerid + ": " +roomtype)
        return NextResponse.json({ message: "Created Successfully" }, { status:201});
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
