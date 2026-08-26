import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const resolvedParams = await params;
    
    const updateData: any = {};
    if (data.inStock !== undefined) updateData.inStock = data.inStock;
    if (data.featured !== undefined) updateData.featured = data.featured;

    const product = await prisma.product.update({
      where: { id: resolvedParams.id },
      data: updateData
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Failed to patch product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const resolvedParams = await params;
    
    const product = await prisma.product.update({
      where: { id: resolvedParams.id },
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
    console.error('Failed to update product:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A product with this Slug already exists. Slugs must be unique.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.product.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
