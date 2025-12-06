// types.ts
export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'received' | 'contacted' | 'not answered';
  createdAt: string;
  attachmentUrl?: string | null;
}
