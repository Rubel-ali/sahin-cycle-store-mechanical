'use client';

import { useState, useRef } from 'react';
import { Product } from '@prisma/client';
import { toast } from 'sonner';
import { Bike, X, UploadCloud, Loader2, ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';

const optimizeCloudinaryUrl = (url: string) => {
  if (url.includes('res.cloudinary.com') && !url.includes('f_auto,q_auto')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
};

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
};

export default function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    slug: product?.slug || '',
    nameEn: product?.nameEn || '',
    nameAr: product?.nameAr || '',
    category: product?.category || 'new',
    condition: product?.condition || 'new',
    price: product?.price || 0,
    images: product?.images || [],
    descriptionEn: product?.descriptionEn || '',
    descriptionAr: product?.descriptionAr || '',
    featured: product?.featured || false,
    inStock: product?.inStock ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        // Auto-generate slug from English Name if creating a new product and they are typing the name
        if (!product && name === 'nameEn') {
          newData.slug = value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        }
        return newData;
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.url) {
        const optimizedUrl = optimizeCloudinaryUrl(json.url);
        setFormData(prev => ({ ...prev, images: [...prev.images, optimizedUrl] }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const savedProduct = await res.json();
        onSave(savedProduct);
      } else {
        const errorData = await res.json();
        toast.error('Failed to save product', { description: errorData.error });
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-4 sm:p-6">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-800 bg-[#0b1120] sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600/20 text-red-500 rounded-lg flex items-center justify-center">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {product ? 'Edit Bicycle Details' : 'Add New Bicycle'}
              </h2>
              <p className="text-slate-400 text-sm">Configure catalog information, pricing, and images.</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center bg-slate-800/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto custom-scrollbar">
          <form id="productForm" onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Bilingual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* English Section */}
              <div className="space-y-5 bg-[#0b1120] p-6 rounded-2xl border border-slate-800/60 shadow-inner">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <h3 className="font-semibold text-white tracking-wide uppercase text-sm">English Details</h3>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Name (EN)</label>
                  <input type="text" name="nameEn" value={formData.nameEn} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-white placeholder:text-slate-600 transition-colors" placeholder="e.g. Carbon Speedster V2" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Description (EN)</label>
                  <textarea name="descriptionEn" value={formData.descriptionEn} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-white placeholder:text-slate-600 transition-colors resize-none" placeholder="Detailed product description..."></textarea>
                </div>
              </div>

              {/* Arabic Section */}
              <div className="space-y-5 bg-[#0b1120] p-6 rounded-2xl border border-slate-800/60 shadow-inner" dir="rtl">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="font-semibold text-white tracking-wide uppercase text-sm">التفاصيل بالعربية</h3>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider text-right">الاسم (AR)</label>
                  <input type="text" name="nameAr" value={formData.nameAr} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-white placeholder:text-slate-600 transition-colors" placeholder="مثال: كاربون سبيدستر" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider text-right">الوصف (AR)</label>
                  <textarea name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-white placeholder:text-slate-600 transition-colors resize-none" placeholder="وصف المنتج بالتفصيل..."></textarea>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#0b1120] p-6 rounded-2xl border border-slate-800/60">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Slug (URL)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-slate-300 font-mono text-sm" placeholder="carbon-speedster-v2" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Price (SAR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">SAR</span>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="w-full pl-14 pr-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-white font-bold" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-white appearance-none">
                  <option value="new">New Bicycles</option>
                  <option value="used">Used Bicycles</option>
                  <option value="kids">Kids Bicycles</option>
                  <option value="scooters">Scooters</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Condition</label>
                <select name="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl text-white appearance-none">
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 px-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="peer sr-only" />
                  <div className="w-6 h-6 border-2 border-slate-600 rounded bg-slate-900 peer-checked:bg-red-600 peer-checked:border-red-600 transition-all"></div>
                  <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">In Stock (Available for Purchase)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="peer sr-only" />
                  <div className="w-6 h-6 border-2 border-slate-600 rounded bg-slate-900 peer-checked:bg-red-600 peer-checked:border-red-600 transition-all"></div>
                  <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Featured Product (Show on Homepage)</span>
              </label>
            </div>

            {/* Cloudinary Image Uploader */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Product Gallery</h3>
                  <p className="text-xs text-slate-400 mt-1">Upload high-quality images. The first image will be the primary cover.</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  disabled={uploading} 
                  ref={fileInputRef}
                  className="hidden" 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 border border-slate-700"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>

              {formData.images.length === 0 ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-700 hover:border-red-500/50 bg-slate-900/50 rounded-2xl p-12 flex flex-col items-center justify-center text-slate-500 hover:text-red-400 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-slate-800 group-hover:bg-red-500/10 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <ImagePlus className="w-8 h-8" />
                  </div>
                  <p className="font-medium text-sm">Drag & drop or click to upload</p>
                  <p className="text-xs opacity-70 mt-1">Supports JPG, PNG, WEBP</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  {formData.images.map((url, i) => (
                    <div 
                      key={i} 
                      className={`group relative rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shadow-lg ${
                        i === 0 ? 'col-span-2 row-span-2 h-[376px] sm:h-[400px]' : 'h-44 sm:h-48'
                      }`}
                    >
                      <Image src={optimizeCloudinaryUrl(url)} alt={`Product ${i+1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                      
                      {i === 0 && (
                        <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider z-10">
                          Cover
                        </div>
                      )}
                      
                      <button 
                        type="button" 
                        onClick={() => removeImage(i)} 
                        className="absolute top-2.5 right-2.5 w-8 h-8 bg-slate-800/80 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
                        title="Remove Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {uploading && (
                    <div className="h-44 sm:h-48 bg-slate-900/50 border border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 animate-pulse">
                      <Loader2 className="w-8 h-8 animate-spin mb-2" />
                      <span className="text-xs font-medium">Uploading...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-slate-800 bg-[#0b1120] shrink-0 flex items-center justify-end gap-4 relative z-10">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-6 py-3 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 hover:text-white transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="productForm"
            disabled={loading || uploading} 
            className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-500 hover:shadow-red-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save & Publish Product'
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
