// app/api/contacts/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { z } from "zod";

const createContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
  attachmentUrl: z.string().url().optional().nullable(),
});

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "50", 10),
    200
  );
  const skip = (Math.max(page, 1) - 1) * limit;

  const [items, total] = await Promise.all([
    Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Contact.countDocuments(),
  ]);

  return NextResponse.json({ items, total, page, limit });
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const parsed = createContactSchema.parse(body);

    const created = await Contact.create({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone ?? "",
      subject: parsed.subject,
      message: parsed.message,
      attachmentUrl: parsed.attachmentUrl ?? null,
      status: "received",
    });

    return NextResponse.json({ success: true, item: created }, { status: 201 });
  } catch (err: any) {
    if (err?.issues) {
      // zod error
      return NextResponse.json(
        { success: false, errors: err.issues },
        { status: 422 }
      );
    }
    return NextResponse.json(
      { success: false, message: err.message || "Invalid request" },
      { status: 400 }
    );
  }
}
