// app/api/contacts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { z } from "zod";

// Validation schema
const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  status: z.enum(["received", "contacted", "not answered"]).optional(),
  attachmentUrl: z.string().url().optional().nullable(),
});

// Helper to resolve params Promise
async function resolveParams(context: { params: Promise<{ id: string }> }) {
  const { params } = context;
  const resolved = await params;
  return resolved.id;
}

// GET contact
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await resolveParams(context);

  const contact = await Contact.findById(id);
  if (!contact)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  return NextResponse.json({ success: true, item: contact });
}

// PATCH contact
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await resolveParams(context);

  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);

    const updated = await Contact.findByIdAndUpdate(id, parsed, { new: true });
    if (!updated)
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, item: updated });
  } catch (err: any) {
    if (err?.issues)
      return NextResponse.json(
        { success: false, errors: err.issues },
        { status: 422 }
      );
    return NextResponse.json(
      { success: false, message: err.message || "Error" },
      { status: 400 }
    );
  }
}

// DELETE contact
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await resolveParams(context);

  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  return NextResponse.json({ success: true, message: "Deleted successfully" });
}

// PUT contact (full update)
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await resolveParams(context);

  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);

    const updated = await Contact.findByIdAndUpdate(id, parsed, {
      new: true,
      overwrite: true,
    });
    if (!updated)
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, item: updated });
  } catch (err: any) {
    if (err?.issues)
      return NextResponse.json(
        { success: false, errors: err.issues },
        { status: 422 }
      );
    return NextResponse.json(
      { success: false, message: err.message || "Error" },
      { status: 400 }
    );
  }
}
