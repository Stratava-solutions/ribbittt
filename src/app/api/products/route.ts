// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from '@/lib/mongodb';
import Product from "@/models/product";

// GET - Fetch all products with optional filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort") || "-createdAt";

    const filter: any = {};

    if (category && category !== "all") filter.category = category;
    if (color && color !== "all") filter.color = color;
    if (size && size !== "all") filter.sizes = size;
    if (featured === "true") filter.featured = true;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).sort(sort);

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("GET Products Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}



// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const { name, price, stock, category, color, sizes, description, images } = body;

    if (!name || !price || stock === undefined || !category || !color || !sizes || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!Array.isArray(sizes) || sizes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one size is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one image is required' },
        { status: 400 }
      );
    }

    const product = await Product.create(body);

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: 'Product created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST Product Error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}