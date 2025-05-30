"use client";
import { fetchCategories } from "@/app/redux/features/getAllCategory/categorySlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AllSubCategory() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  console.log("categories", categories);
  console.log(
    "category",
    categories.map((category) => category.categoryImage)
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse space-y-2 rounded-lg border border-gray-200 p-4 shadow"
          >
            <div className="h-32 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">Error loading banners</div>
    );
  }

  return (
    <section className="w-full py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of books across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={"#"}
              passHref
              className="group block bg-purple-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={category.categoryImage ?? "/placeholder.svg"}
                  alt={category.categoryName}
                  width={400}
                  height={300}
                  className="w-full h-40 sm:h-56 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Name */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white text-center">
                  {category.categoryName}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
