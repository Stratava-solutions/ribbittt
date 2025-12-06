import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/admin";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({ email, password: hashedPassword });

    return NextResponse.json({
      message: "Admin registered successfully",
      admin: { email: admin.email, _id: admin._id },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
