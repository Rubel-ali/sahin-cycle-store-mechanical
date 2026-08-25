import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real app, you should validate with Zod here
    const product = await prisma.product.create({
      data: {
        slug: data.slug,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        category: data.category,
        condition: data.condition,
        price: data.price,
        images: data.images,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        featured: data.featured,
        inStock: data.inStock,
      }
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Failed to create product:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A product with this Slug already exists. Slugs must be unique.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
