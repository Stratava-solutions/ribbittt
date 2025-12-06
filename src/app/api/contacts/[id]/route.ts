// app/api/contacts/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().optional(),
  status: z.enum(['received', 'contacted', 'not answered']).optional(),
  attachmentUrl: z.string().url().optional().nullable()
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const id = params.id;
  try {
    const body = await req.json();
    const parsed = updateSchema.parse(body);

    const updated = await Contact.findByIdAndUpdate(id, parsed, { new: true });
    if (!updated) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, item: updated });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ success: false, errors: err.issues }, { status: 422 });
    }
    return NextResponse.json({ success: false, message: err.message || 'Error' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const id = params.id;
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
