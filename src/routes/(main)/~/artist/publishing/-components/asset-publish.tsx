import React, { useState } from "react";

import { ImageIcon, Plus, Upload, X } from "lucide-react";
import { categories } from "../../../general/explore/-components/mock-assets";

interface AssetUploadProps {
  onClose: () => void;
}

export function AssetPublish({ onClose }: AssetUploadProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: [] as string[],
    newTag: "",
  });

  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Asset uploaded:", formData);
    onClose();
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload 3D Asset</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* File Upload Area */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              3D Model File
            </label>
            <div
              className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200 ${
                dragOver
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
            >
              <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="mb-2 text-gray-600">Drop your 3D model file here, or</p>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-800"
              >
                browse to upload
              </button>
              <p className="mt-2 text-xs text-gray-500">
                Supports .gltf, .glb, .fbx, .obj files up to 50MB
              </p>
            </div>
          </div>

          {/* Preview Images */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Preview Images
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors duration-200 hover:border-gray-400"
                >
                  <ImageIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload image {i}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter asset title"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="">Select a category</option>
              {categories
                .filter((cat) => cat !== "All")
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Describe your 3D asset..."
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Tags</label>
            <div className="mb-2 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-indigo-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newTag}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, newTag: e.target.value }))
                }
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-100 px-6 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-2 text-white transition-colors duration-200 hover:bg-indigo-700"
            >
              Upload Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
