'use client';

import { useState, useMemo } from 'react';
import ProductModal from './ProductModal';
import { Product } from '@prisma/client';
import { toast } from 'sonner';
import { Search, Plus, Edit3, Trash2, CheckCircle2, XCircle, Star, Package, Filter, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const optimizeCloudinaryUrl = (url: string) => {
  if (url.includes('res.cloudinary.com') && !url.includes('f_auto,q_auto')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
};

export default function ProductDashboardClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const executeDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        toast.success('Product deleted successfully');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (e) {
      toast.error('Error deleting product');
    }
  };

  const handleDelete = (id: string, name: string) => {
    toast.error(`Delete ${name}?`, {
      description: 'This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => executeDelete(id)
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {}
      },
      duration: 5000,
    });
  };

  const handleSave = (savedProduct: Product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
      toast.success('Product updated successfully');
    } else {
      setProducts([savedProduct, ...products]);
      toast.success('Product created successfully');
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleToggleStock = async (id: string, newInStock: boolean) => {
    // Optimistic update
    setProducts(products.map(p => p.id === id ? { ...p, inStock: newInStock } : p));
    
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: newInStock })
      });
      
      if (!res.ok) {
        throw new Error('Failed to update stock status');
      }
      toast.success(newInStock ? 'Product marked as IN STOCK' : 'Product marked as OUT OF STOCK');
    } catch (e) {
      toast.error('Error updating stock status');
      // Revert optimistic update
      setProducts(products.map(p => p.id === id ? { ...p, inStock: !newInStock } : p));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.nameAr.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#090d16] p-6 lg:p-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-white tracking-tight">Inventory Management</h1>
            <span className="px-3 py-1 bg-red-600/10 text-red-500 border border-red-600/20 rounded-full text-sm font-bold shadow-sm shadow-red-500/10">
              {products.length} Items
            </span>
          </div>
          <p className="text-slate-400 font-medium">Manage your bicycle catalog, pricing, and availability.</p>
        </div>
        
        <button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="group flex items-center gap-2 bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-500 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Add New Bicycle
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl shadow-black/20 backdrop-blur-sm flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by English or Arabic name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
          />
        </div>
        
        {/* Category Filter */}
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-[#0d1526] text-white border border-slate-700/80 rounded-xl appearance-none focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium"
          >
            <option className="bg-[#0b1120] text-white py-2" value="all">All Categories</option>
            <option className="bg-[#0b1120] text-white py-2" value="new">New Bicycles</option>
            <option className="bg-[#0b1120] text-white py-2" value="used">Used Bicycles</option>
            <option className="bg-[#0b1120] text-white py-2" value="kids">Kids Bicycles</option>
            <option className="bg-[#0b1120] text-white py-2" value="scooters">Scooters</option>
            <option className="bg-[#0b1120] text-white py-2" value="accessories">Accessories</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Bicycle</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Category</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Price (SAR)</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/30 transition-colors group">
                  
                  {/* Bicycle Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden shrink-0 shadow-inner">
                        {product.images[0] ? (
                          <Image src={optimizeCloudinaryUrl(product.images[0])} alt={product.nameEn} fill sizes="56px" className="object-contain p-1" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <Package className="w-6 h-6 opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-base truncate">{product.nameEn}</div>
                        <div className="text-slate-500 text-xs font-medium truncate mt-0.5" dir="rtl">{product.nameAr}</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Category & Condition */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-2">
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg uppercase tracking-wider border border-slate-700">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <span className={`w-2 h-2 rounded-full ${product.condition === 'new' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                        <span className="capitalize">{product.condition}</span>
                      </div>
                    </div>
                  </td>

                  {/* Pricing */}
                  <td className="px-6 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-white">{product.price.toLocaleString()}</span>
                      <span className="text-xs font-bold text-slate-500">{product.currency}</span>
                    </div>
                  </td>

                  {/* Status & Featured */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {product.inStock ? (
                        <button onClick={() => handleToggleStock(product.id, false)} className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 border border-emerald-400/20 px-2.5 py-1 rounded-lg text-xs font-bold w-fit transition-colors cursor-pointer">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          IN STOCK
                        </button>
                      ) : (
                        <button onClick={() => handleToggleStock(product.id, true)} className="inline-flex items-center gap-1.5 text-rose-400 bg-rose-400/10 hover:bg-rose-400/20 border border-rose-400/20 px-2.5 py-1 rounded-lg text-xs font-bold w-fit transition-colors cursor-pointer">
                          <XCircle className="w-3.5 h-3.5" />
                          OUT OF STOCK
                        </button>
                      )}
                      
                      {product.featured && (
                        <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          FEATURED
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                        className="p-2.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-blue-600/20"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id, product.nameEn)}
                        className="p-2.5 bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-rose-600/20"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center px-4">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">No products found</h3>
              <p className="text-slate-500 max-w-md">
                We couldn't find any products matching your current filters. Try adjusting your search term or category.
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
