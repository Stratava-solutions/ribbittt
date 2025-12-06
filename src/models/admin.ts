import mongoose, { Schema, model, models } from 'mongoose';

interface IAdmin {
  email: string;
  password: string;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = models.Admin || model<IAdmin>('Admin', AdminSchema);
export default Admin;
