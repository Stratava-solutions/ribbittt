// models/Contact.ts
import mongoose, { Schema, model, models } from "mongoose";

export type ContactDoc = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "received" | "contacted" | "not answered";
  createdAt?: Date;
  updatedAt?: Date;
  attachmentUrl?: string | null;
};

const ContactSchema = new Schema<ContactDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["received", "contacted", "not answered"],
      default: "received",
    },
    attachmentUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export const Contact =
  (models?.Contact as mongoose.Model<ContactDoc>) ||
  model<ContactDoc>("Contact", ContactSchema);
