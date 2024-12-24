import connectDB, { disconnectDB } from "@/public/db";
import { NextResponse } from "next/server";
// import RuserModel from "@/models/RuserModel";
import RoomModel from "@/models/RoomModel";

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Get email from query parameters
    const { searchParams } = new URL(req.url);
    const ownerid = searchParams.get("ownerid");

    if (!ownerid) {
      return NextResponse.json(
        { message: "ownerid parameter is required" },
        { status: 400 }
      );
    }

    // Find the user in the database
    const rooms = await RoomModel.find({ ownerid: ownerid });

    // Check if rooms are found, then return them as an array, else return an error message
    if (rooms.length > 0) {
      console.log(rooms); // You can log the rooms to see them
      return NextResponse.json(rooms, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No rooms found in this city" },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log("Error occurred:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
