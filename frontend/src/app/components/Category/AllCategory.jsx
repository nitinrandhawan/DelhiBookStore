"use client";
import { fetchCategories } from "@/app/redux/features/getAllCategory/categorySlice";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  // Helper function to generate light pastel color
  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360); // hue between 0-360
    const pastel = `hsl(${hue}, 100%, 90%)`; // pastel background using HSL
    return pastel;
  };

  // UseMemo to generate stable colors once when categories load
  const categoryColors = useMemo(() => {
    const colorMap = {};
    categories.forEach((cat) => {
      colorMap[cat._id] = getRandomLightColor();
    });
    return colorMap;
  }, [categories]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-4xl font-bold mb-4 text-center text-purple-800">
          All Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg h-20 animate-pulse bg-purple-100"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">
        Error loading categories
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center text-purple-800">
        All Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="shadow-md border p-4 rounded-lg hover:shadow-lg transition"
            style={{
              backgroundColor: categoryColors[cat._id],
              color: "#333",
            }}
          >
            <p className="text-center font-semibold text-sm md:text-lg">
              {cat.categoryName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
