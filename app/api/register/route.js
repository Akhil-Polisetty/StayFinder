// import connectDB, { disconnectDB } from "@/source/db";
import connectDB,{disconnectDB} from "@/public/db";
import { NextResponse } from "next/server";
import RuserModel from "@/models/RuserModel";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    console.log("Entered register page");

    // Parse request body
    const { name, email, password } = await req.json();

    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const existingUser = await RuserModel.findOne({ email_id: email });
    if (existingUser) {
      return NextResponse.json({ message: "User already registered" }, { status: 409 });
    }

    console.log("No error up to server 58");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      u_name: name,
      email_id: email,
      passkey: hashedPassword,
    };

    console.log("New user is:", newUser);

    // Create the new user in the database
    await RuserModel.create(newUser);
    console.log("Successfully inserted new user");

    return NextResponse.json({ message: "Registration Completed" }, { status: 200 });
  } catch (error) {
    console.log("Error Occurred at server 69:", error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    // Disconnect from the database
    await disconnectDB();
  }
}
