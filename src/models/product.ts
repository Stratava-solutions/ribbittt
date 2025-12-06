import mongoose, { Schema, Document } from 'mongoose';


/**
 * src/models/Product.ts
 */
export interface IProduct extends Document {
  name: string;
  price: number;
  stock: number;
  sold: number;
  category: 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'sets';
  color: string;
  sizes: string[];
  description: string;
  images: {
    url: string;
    thumbnailUrl: string;
    deleteUrl: string;
  }[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
      min: [0, 'Sold count cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['dresses', 'tops', 'bottoms', 'outerwear', 'sets'],
        message: '{VALUE} is not a valid category',
      },
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
      trim: true,
    },
    sizes: {
      type: [String],
      required: [true, 'At least one size is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Product must have at least one size',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        thumbnailUrl: {
          type: String,
          required: true,
        },
        deleteUrl: {
          type: String,
          required: true,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ featured: 1, createdAt: -1 });
ProductSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);