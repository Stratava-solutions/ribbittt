// src/components/ProductModal.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Upload, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getImgBBUploader } from '@/lib/imdb';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().min(0, 'Stock must be positive').int(),
  category: z.enum(['dresses', 'tops', 'bottoms', 'outerwear', 'sets']),
  color: z.string().min(1, 'Color is required'),
  sizes: z.array(z.string()).min(1, 'Select at least one size'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  featured: z.boolean().default(false),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editProduct?: any; 
}

export function CreateUpdateProduct({ isOpen, onClose, onSuccess, editProduct }: ProductModalProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const isEditMode = !!editProduct;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      category: 'dresses',
      color: '',
      sizes: [],
      description: '',
      featured: false,
    },
  });

  const selectedSizes = watch('sizes');

  // Reset form when modal opens/closes or editProduct changes
  useEffect(() => {
    if (isOpen) {
      if (editProduct) {
        // Edit mode - populate form
        reset({
          name: editProduct.name || '',
          price: editProduct.price || 0,
          stock: editProduct.stock || 0,
          category: editProduct.category || 'dresses',
          color: editProduct.color || '',
          sizes: editProduct.sizes || [],
          description: editProduct.description || '',
          featured: editProduct.featured || false,
        });
        setExistingImages(editProduct.images || []);
        setImagePreviews([]);
        setImageFiles([]);
      } else {
        // Create mode - reset form
        reset({
          name: '',
          price: 0,
          stock: 0,
          category: 'dresses',
          color: '',
          sizes: [],
          description: '',
          featured: false,
        });
        setExistingImages([]);
        setImagePreviews([]);
        setImageFiles([]);
      }
    }
  }, [isOpen, editProduct, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const totalImages = existingImages.length + imagePreviews.length + files.length;
    if (totalImages > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    setImageFiles((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    try {
      setIsUploading(true);

      let uploadedImages = [...existingImages];

      // Upload new images if any
      if (imageFiles.length > 0) {
        const uploader = getImgBBUploader();
        toast.loading('Uploading images...', { id: 'upload' });
        
        const results = await uploader.uploadMultiple(imageFiles, data.name);
        toast.success('Images uploaded!', { id: 'upload' });
        
        uploadedImages = [...uploadedImages, ...results];
      }

      if (uploadedImages.length === 0) {
        toast.error('Please add at least one image');
        setIsUploading(false);
        return;
      }

      const productData = {
        ...data,
        images: uploadedImages,
      };

      const url = isEditMode
        ? `/api/products/${editProduct._id}`
        : '/api/products';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to save product');
      }

      toast.success(result.message || `Product ${isEditMode ? 'updated' : 'created'} successfully!`);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Failed to save product');
    } finally {
      setIsUploading(false);
    }
  };

  const sizeOptions = ['2-4Y', '4-6Y', '6-8Y', '8-10Y', '10-12Y'];

  const toggleSize = (size: string) => {
    const current = selectedSizes || [];
    const updated = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    setValue('sizes', updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray bg-transparent bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Product' : 'Create New Product'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Rainbow Dress"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="29.99"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  {...register('stock', { valueAsNumber: true })}
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                )}
              </div>
            </div>

            {/* Category and Color */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="dresses">Dresses</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="sets">Sets</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <input
                  {...register('color')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Blue, Multicolor"
                />
                {errors.color && (
                  <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Sizes *
              </label>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition ${
                      selectedSizes?.includes(size)
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errors.sizes && (
                <p className="mt-1 text-sm text-red-600">{errors.sizes.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the product..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images * (Max 5)
              </label>
              
              <div className="grid grid-cols-5 gap-4 mb-4">
                {/* Existing Images */}
                {existingImages.map((img, index) => (
                  <div key={`existing-${index}`} className="relative aspect-square">
                    <Image
                      src={img.url}
                      alt={`Existing ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      Saved
                    </div>
                  </div>
                ))}

                {/* New Image Previews */}
                {imagePreviews.map((preview, index) => (
                  <div key={`new-${index}`} className="relative aspect-square">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                      New
                    </div>
                  </div>
                ))}

                {/* Add Image Button */}
                {(existingImages.length + imagePreviews.length) < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-2">Add</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
              <input
                {...register('featured')}
                type="checkbox"
                id="featured"
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Mark as Featured Product
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                disabled={isSubmitting || isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                {(isSubmitting || isUploading) && <Loader2 className="w-5 h-5 animate-spin" />}
                {isEditMode ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}